import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Podaj adres e-mail.")
    .email("Podaj poprawny adres e-mail."),
});

export type LoginInput = z.infer<typeof loginSchema>;
