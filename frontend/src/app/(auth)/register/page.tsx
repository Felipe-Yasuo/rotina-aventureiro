"use client";

import Link from "next/link";
import { useRegister } from "@/modules/auth/hooks/useRegister";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const { form, handleRegister, loading, serverError } = useRegister();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-hero-bg bg-cover bg-center flex items-center justify-center px-4 relative">

            <div className="absolute inset-0 bg-gradient-to-b from-[#4a6675]/50 to-[#e8f0f5]/30 backdrop-blur-[2px]" />

            <div className="relative z-10 w-full max-w-md bg-white/60 border border-white/40 rounded-2xl p-8 shadow-lg backdrop-blur-xl">

                <h1 className="text-3xl font-title text-deepTwilight text-center mb-6">
                    Junte-se à jornada
                </h1>

                <form
                    onSubmit={form.handleSubmit(async (data) => {
                        const ok = await handleRegister(data);
                        if (ok) router.push("/login");
                    })}
                    className="space-y-4"
                >

                    {/* NOME */}
                    <div>
                        <label className="text-deepTwilight text-sm font-text">Nome</label>
                        <input
                            type="text"
                            {...form.register("name")}
                            className="w-full mt-1 px-3 py-2 rounded-md bg-white/60 border border-skyMist text-deepTwilight focus:ring-2 focus:ring-frierenBlue focus:border-frierenBlue outline-none"
                        />
                        {form.formState.errors.name && (
                            <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="text-deepTwilight text-sm font-text">E-mail</label>
                        <input
                            type="email"
                            {...form.register("email")}
                            className="w-full mt-1 px-3 py-2 rounded-md bg-white/60 border border-skyMist text-deepTwilight focus:ring-2 focus:ring-frierenBlue"
                        />
                        {form.formState.errors.email && (
                            <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    {/* SENHA */}
                    <div>
                        <label className="text-deepTwilight text-sm font-text">Senha</label>
                        <input
                            type="password"
                            {...form.register("password")}
                            className="w-full mt-1 px-3 py-2 rounded-md bg-white/60 border border-skyMist text-deepTwilight focus:ring-2 focus:ring-frierenBlue"
                        />
                        {form.formState.errors.password && (
                            <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
                        )}
                    </div>

                    {serverError && (
                        <p className="text-red-600 text-center text-sm">{serverError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-xl bg-frierenBlue hover:bg-skyMist text-deepTwilight font-title shadow-md transition-all active:scale-[0.98]"
                    >
                        {loading ? "Criando..." : "Criar conta"}
                    </button>
                </form>

                <p className="text-center text-deepTwilight text-sm mt-4 font-text">
                    Já tem conta?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Entrar
                    </Link>
                </p>
            </div>
        </div>
    );
}
