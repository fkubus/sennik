import { z } from "zod";

export const interpretationRequestSchema = z.object({
  dreamText: z
    .string()
    .trim()
    .min(10, "Opisz swój sen w co najmniej kilku zdaniach.")
    .max(2000, "Opis snu może mieć maksymalnie 2000 znaków."),
  emotions: z.array(z.string().trim().min(1).max(40)).max(8).optional(),
  lifeContext: z
    .string()
    .trim()
    .max(500, "Kontekst życiowy może mieć maksymalnie 500 znaków.")
    .optional(),
});

export type InterpretationRequest = z.infer<typeof interpretationRequestSchema>;
