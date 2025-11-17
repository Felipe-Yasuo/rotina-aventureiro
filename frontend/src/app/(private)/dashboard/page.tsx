"use client";

import { useAuth } from "@/hooks/useAuth";
import { Heading } from "@/components/ui/heading";
import { CardHero } from "@/components/ui/card-hero";

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-hero-bg bg-cover relative px-6">

            <div className="absolute inset-0 bg-gradient-to-b from-[#4a6675]/50 to-[#e8f0f5]/30 backdrop-blur-[2px]" />

            <div className="relative z-10 w-full max-w-2xl">
                <CardHero className="text-center space-y-4">

                    <Heading size="md">🌟 Bem-vindo, {user?.name}</Heading>

                    <p className="font-text text-deepTwilight/80">
                        Seu nível atual: <strong>{user?.level}</strong>
                    </p>

                    <p className="font-text text-deepTwilight/80">
                        XP: {user?.xp} — Dinheiro: {user?.money}💰
                    </p>
                </CardHero>
            </div>

        </div>
    );
}
