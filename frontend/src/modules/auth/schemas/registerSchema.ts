import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, "O nome é obrigatório.")
        .min(3, "O nome deve ter pelo menos 3 caracteres."),
    email: z
        .string()
        .min(1, "O e-mail é obrigatório.")
        .email("Formato de e-mail inválido."),
    password: z
        .string()
        .min(1, "A senha é obrigatória.")
        .min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
