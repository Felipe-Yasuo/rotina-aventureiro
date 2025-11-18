"use client";

import { useAuth } from "@/hooks/useAuth";
import { CardHero } from "@/components/ui/card-hero";

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="space-y-6">
            <h1 className="font-title text-4xl text-center mb-4">
                Perfil de {user.name} 🌸
            </h1>

            <CardHero className="max-w-xl mx-auto space-y-4">
                <p className="text-lg">Level: <strong>{user.level}</strong></p>
                <p>XP: <strong>{user.xp}</strong></p>
                <p>Moedas: <strong>{user.money}</strong></p>
                <p>Streak: <strong>{user.streak}</strong> dias</p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-sm font-text">
                    <p>Força: <strong>{user.strength}</strong></p>
                    <p>Inteligência: <strong>{user.intelligence}</strong></p>
                    <p>Criatividade: <strong>{user.creativity}</strong></p>
                    <p>Carisma: <strong>{user.charisma}</strong></p>
                </div>

                <p className="text-center text-deepTwilight/80">
                    Conquistas e progresso aparecerão aqui em breve ✨
                </p>
            </CardHero>
        </div>
    );
}
