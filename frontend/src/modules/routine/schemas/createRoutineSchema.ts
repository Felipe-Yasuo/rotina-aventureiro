import { z } from "zod";

export const createRoutineSchema = z.object({
    title: z.string().min(1, "Título obrigatório."),
    description: z.string().optional(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    imageUrl: z.string().min(1, "Imagem obrigatória."),
    attributes: z.array(
        z.enum([
            "STRENGTH",
            "INTELLIGENCE",
            "CHARISMA",
            "CREATIVITY",
            "HEALTH"
        ])
    ).min(1, "Selecione pelo menos 1 atributo."),
});

export type CreateRoutineInput = z.infer<typeof createRoutineSchema>;
