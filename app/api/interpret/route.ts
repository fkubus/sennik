import Anthropic from "@anthropic-ai/sdk";
import { NextResponse, type NextRequest } from "next/server";
import { interpretationRequestSchema } from "@/lib/validations/interpretation";
import {
  DREAM_INTERPRETATION_SYSTEM_PROMPT,
  buildDreamInterpretationUserMessage,
} from "@/lib/ai/system-prompt";
import { containsCrisisSignal } from "@/lib/ai/crisis-detection";
import { checkInterpretRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001";
const MAX_RESPONSE_TOKENS = 900;

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  return "anonymous";
}

export async function POST(request: NextRequest) {
  const identifier = getClientIdentifier(request);
  const rateLimit = await checkInterpretRateLimit(identifier);

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        error:
          "Zbyt wiele prób w krótkim czasie. Spróbuj ponownie za kilka minut.",
      },
      { status: 429 },
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = interpretationRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Nieprawidłowe dane." },
      { status: 400 },
    );
  }

  const { dreamText, emotions, lifeContext } = parsed.data;

  if (containsCrisisSignal(dreamText, lifeContext)) {
    return NextResponse.json({ crisis: true });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Interpretacja AI nie jest jeszcze skonfigurowana (brak ANTHROPIC_API_KEY).",
      },
      { status: 503 },
    );
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const stream = anthropic.messages.stream({
    model: MODEL,
    max_tokens: MAX_RESPONSE_TOKENS,
    system: DREAM_INTERPRETATION_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildDreamInterpretationUserMessage({
          dreamText,
          emotions,
          lifeContext,
        }),
      },
    ],
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      stream.on("text", (delta) => {
        controller.enqueue(encoder.encode(delta));
      });
      stream.on("end", () => controller.close());
      stream.on("error", (error) => controller.error(error));
      stream.on("abort", (error) => controller.error(error));
    },
    cancel() {
      stream.controller.abort();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
