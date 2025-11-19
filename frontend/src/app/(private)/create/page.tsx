"use client";

import { useCreateRoutine } from "@/modules/routine/hooks/useCreateRoutine";

export default function CreateRoutinePage() {
    const { form, handleCreate, fileInputRef } = useCreateRoutine();

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">

            <h1 className="text-4xl font-title text-deepTwilight text-center mb-4">
                Criar nova rotina ✨
            </h1>

            <form onSubmit={form.handleSubmit(handleCreate)}
                className="space-y-4"
            >
                {/* Título */}
                <input type="text"
                    placeholder="Título"
                    {...form.register("title")}
                    className="w-full p-3 rounded-lg border border-skyMist"
                />

                {/* Descrição */}
                <textarea placeholder="Descrição..."
                    {...form.register("description")}
                    className="w-full p-3 rounded-lg border border-skyMist"
                />

                {/* Dificuldade */}
                <select
                    {...form.register("difficulty")}
                    className="w-full p-3 rounded-lg border border-skyMist"
                >
                    <option value="EASY">Fácil</option>
                    <option value="MEDIUM">Médio</option>
                    <option value="HARD">Difícil</option>
                </select>

                {/* Atributos */}
                <div className="grid grid-cols-2 gap-2">
                    {["STRENGTH", "INTELLIGENCE", "CHARISMA", "CREATIVITY", "HEALTH"].map(attr => (
                        <label key={attr} className="flex items-center gap-2">
                            <input type="checkbox"
                                value={attr}
                                {...form.register("attributes")}
                            />
                            {attr}
                        </label>
                    ))}
                </div>

                {/* Upload da imagem */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="w-full p-3 border border-skyMist rounded-lg"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        form.setValue("imageFile", file);
                    }}
                />

                {/* Botão */}
                <button type="submit"
                    className="w-full py-3 bg-frierenBlue text-deepTwilight rounded-xl font-title shadow hover:bg-skyMist"
                >
                    Criar rotina
                </button>
            </form>
        </div>
    );
}

