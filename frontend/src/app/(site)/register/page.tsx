"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
    const { signUp } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        try {
            await signUp(name, email, password);
        } catch (err: any) {
            setError(err.message || "Erro ao criar conta.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <form
                onSubmit={handleRegister}
                className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-5"
            >
                <h1 className="text-2xl font-bold text-center">Criar Personagem 🧙‍♂️</h1>

                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
                />

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded text-white font-semibold"
                >
                    Criar conta
                </button>

                <p className="text-center text-sm text-gray-400">
                    Já tem conta?{" "}
                    <a href="/login" className="text-green-400 hover:underline">
                        Faça login
                    </a>
                </p>
            </form>
        </div>
    );
}
