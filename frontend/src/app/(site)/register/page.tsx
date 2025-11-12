"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
    email: z.string().email("E-mail inválido."),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
    const { signUp } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    async function onSubmit(data: FormData) {
        try {
            await signUp(data.name, data.email, data.password);
            router.push("/dashboard");
        } catch (err: any) {
            alert(err?.response?.data?.message ?? "Falha ao registrar.");
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h1 className="text-2xl font-bold mb-4">Criar Conta</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input className="w-full rounded-lg bg-gray-800 p-3" placeholder="Nome" {...register("name")} />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <input className="w-full rounded-lg bg-gray-800 p-3" placeholder="E-mail" type="email" {...register("email")} />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <input className="w-full rounded-lg bg-gray-800 p-3" placeholder="Senha" type="password" {...register("password")} />
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-500 hover:bg-green-600 transition rounded-lg p-3 font-semibold"
                    >
                        {isSubmitting ? "Criando..." : "Começar Jornada"}
                    </button>
                </form>
            </div>
        </main>
    );
}
