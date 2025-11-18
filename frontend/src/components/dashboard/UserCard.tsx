"use client";

import { useAuth } from "@/hooks/useAuth";
import { CardHero } from "@/components/ui/card-hero";

export function UserCard() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <CardHero className="max-w-md mx-auto mt-8 text-center space-y-2">
            <h3 className="font-title text-2xl">🌿 Seu Progresso</h3>

            <p className="font-text">Level: <strong>{user.level}</strong></p>
            <p className="font-text">XP: <strong>{user.xp}</strong></p>
            <p className="font-text">Moedas: <strong>{user.money}</strong></p>
            <p className="font-text">Streak: <strong>{user.streak} dias</strong></p>

            <div className="grid grid-cols-2 gap-2 pt-2 text-sm font-text">
                <p>Força: <strong>{user.strength}</strong></p>
                <p>Inteligência: <strong>{user.intelligence}</strong></p>
                <p>Criatividade: <strong>{user.creativity}</strong></p>
                <p>Carisma: <strong>{user.charisma}</strong></p>
            </div>
        </CardHero>
    );
}
