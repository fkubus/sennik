"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertTriangle, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { crisisSupportLines } from "@/lib/config/crisis-support";

const DREAM_MAX_LENGTH = 2000;
const CONTEXT_MAX_LENGTH = 500;

const EMOTION_OPTIONS = [
  "Radość",
  "Smutek",
  "Lęk",
  "Złość",
  "Ulga",
  "Zdziwienie",
  "Spokój",
  "Zagubienie",
];

type Status = "idle" | "loading" | "streaming" | "done" | "error" | "crisis";

export function DreamInterpretationForm() {
  const [dreamText, setDreamText] = useState("");
  const [lifeContext, setLifeContext] = useState("");
  const [emotions, setEmotions] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleEmotion = (emotion: string) => {
    setEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion],
    );
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (dreamText.trim().length < 10) {
      setErrorMessage("Opisz swój sen w co najmniej kilku zdaniach.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setResult("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dreamText,
          emotions: emotions.length > 0 ? emotions : undefined,
          lifeContext: lifeContext.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setErrorMessage(
          data?.error ?? "Coś poszło nie tak. Spróbuj ponownie za chwilę.",
        );
        setStatus("error");
        return;
      }

      const contentType = response.headers.get("Content-Type") ?? "";

      if (contentType.includes("application/json")) {
        const data = await response.json();
        if (data.crisis) {
          setStatus("crisis");
          return;
        }
        setErrorMessage(data?.error ?? "Coś poszło nie tak.");
        setStatus("error");
        return;
      }

      if (!response.body) {
        setErrorMessage("Brak odpowiedzi serwera.");
        setStatus("error");
        return;
      }

      setStatus("streaming");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setResult(accumulated);
      }

      setStatus("done");
    } catch {
      setErrorMessage(
        "Nie udało się połączyć z serwerem. Sprawdź połączenie i spróbuj ponownie.",
      );
      setStatus("error");
    }
  }

  if (status === "crisis") {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-destructive mt-0.5 size-5 shrink-0" />
            <div>
              <h2 className="text-lg font-semibold">
                Ważne — nie jesteś sam/-a z tym, co czujesz
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                To, co opisałeś/-aś, brzmi poważnie. Zamiast interpretować sen,
                chcemy wskazać Ci miejsca, gdzie możesz porozmawiać z kimś, kto
                naprawdę może pomóc — teraz, na jawie.
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-2">
            {crisisSupportLines.map((line) => (
              <li
                key={line.phone}
                className="bg-background rounded-lg border p-3 text-sm"
              >
                <span className="font-semibold">{line.name}: </span>
                <a
                  href={`tel:${line.phone.replace(/\s/g, "")}`}
                  className="text-primary font-semibold"
                >
                  {line.phone}
                </a>
                <p className="text-muted-foreground mt-0.5">
                  {line.description}
                </p>
              </li>
            ))}
          </ul>
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Wróć do formularza
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <Label htmlFor="dream-text">Opisz swój sen</Label>
            <span className="text-muted-foreground text-xs">
              {dreamText.length}/{DREAM_MAX_LENGTH}
            </span>
          </div>
          <Textarea
            id="dream-text"
            value={dreamText}
            onChange={(e) =>
              setDreamText(e.target.value.slice(0, DREAM_MAX_LENGTH))
            }
            placeholder="Np. Śniło mi się, że szłam przez las nocą i nagle zaczęłam spadać w ciemność…"
            className="min-h-40"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Jakie emocje towarzyszyły snowi? (opcjonalnie)</Label>
          <div className="flex flex-wrap gap-2">
            {EMOTION_OPTIONS.map((emotion) => (
              <button
                key={emotion}
                type="button"
                onClick={() => toggleEmotion(emotion)}
                aria-pressed={emotions.includes(emotion)}
              >
                <Badge
                  variant={emotions.includes(emotion) ? "default" : "secondary"}
                  className="cursor-pointer select-none"
                >
                  {emotion}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <Label htmlFor="life-context">
              Sytuacja życiowa, o której warto wiedzieć (opcjonalnie)
            </Label>
            <span className="text-muted-foreground text-xs">
              {lifeContext.length}/{CONTEXT_MAX_LENGTH}
            </span>
          </div>
          <Textarea
            id="life-context"
            value={lifeContext}
            onChange={(e) =>
              setLifeContext(e.target.value.slice(0, CONTEXT_MAX_LENGTH))
            }
            placeholder="Np. Ostatnio zmieniłam pracę i czuję się niepewnie."
            className="min-h-20"
          />
        </div>

        {status === "error" && (
          <p className="text-destructive text-sm" role="alert">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={status === "loading" || status === "streaming"}
          className="self-start"
        >
          {status === "loading" || status === "streaming" ? (
            <>
              <Loader2 className="animate-spin" />
              Interpretuję Twój sen…
            </>
          ) : (
            <>
              <Sparkles />
              Zinterpretuj mój sen
            </>
          )}
        </Button>
      </form>

      {result && (
        <Card>
          <CardContent
            className={cn(
              "prose prose-headings:text-base prose-headings:font-semibold max-w-none pt-6",
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
