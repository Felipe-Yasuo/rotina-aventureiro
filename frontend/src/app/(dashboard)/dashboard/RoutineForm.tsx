"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

interface Props {
    onCreated: () => void;
}

export default function RoutineForm({ onCreated }: Props) {
    const { token } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("EASY");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await api.post(
                "/routines",
                { title, description, difficulty, imageUrl: "https://img.com/placeholder.png" },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setTitle("");
            setDescription("");
            setDifficulty("EASY");
            onCreated();
            setMessage("✅ Rotina criada com sucesso!");
        } catch (err: any) {
            console.error(err);
            setMessage("❌ Erro ao criar rotina.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleCreate}
            className="p-5 rounded-xl bg-gray-900 border border-gray-800 space-y-4"
        >
            <h3 className="text-lg font-semibold text-green-400">Nova Rotina</h3>

            <input
                type="text"
                placeholder="Título da rotina"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <textarea
                placeholder="Descrição (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none resize-none"
            />

            <div className="flex items-center gap-3">
                <label>Dificuldade:</label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="p-2 rounded bg-gray-800 border border-gray-700"
                >
                    <option value="EASY">Fácil</option>
                    <option value="MEDIUM">Média</option>
                    <option value="HARD">Difícil</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded text-white font-semibold"
            >
                {loading ? "Criando..." : "Criar Rotina"}
            </button>

            {message && <p className="text-sm text-gray-300">{message}</p>}
        </form>
    );
}
