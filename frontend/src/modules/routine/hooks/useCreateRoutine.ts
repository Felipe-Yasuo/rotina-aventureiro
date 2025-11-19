"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
    createRoutineSchema,
    type CreateRoutineInput,
} from "../schemas/createRoutineSchema";
import { createRoutineRequest } from "../api/createRoutine";
import { useRef } from "react";

export function useCreateRoutine() {
    // precisamos disso para limpar manualmente o input de imagem
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const form = useForm<CreateRoutineInput>({
        resolver: zodResolver(createRoutineSchema),
        defaultValues: {
            title: "",
            description: "",
            difficulty: "EASY",
            attributes: [],
            imageFile: null, // imagem não obrigatória
        },
    });

    async function handleCreate(data: CreateRoutineInput) {
        try {
            const file = data.imageFile ?? null;

            const payload = {
                ...data,
                imageFile: file, // pode ser File OU null
            };

            await createRoutineRequest(payload);

            toast.success("Rotina criada com sucesso! ✨");

            // 🔥 limpa todos os campos
            form.reset({
                title: "",
                description: "",
                difficulty: "EASY",
                attributes: [],
                imageFile: null,
            });

            // 🔥 limpa o input de arquivo manualmente
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error) {
            console.error("Erro ao criar rotina:", error);
            toast.error("Erro ao criar rotina.");
        }
    }

    return {
        form,
        handleCreate,
        fileInputRef, // retornamos para usar no componente
    };
}
