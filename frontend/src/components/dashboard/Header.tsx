"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

// Ícones
import { FireIcon, HeartIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

export function Header() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <header className="w-full bg-white/50 backdrop-blur-md border-b border-fogGray shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link href="/dashboard">
                    <h2 className="font-title text-2xl text-deepTwilight hover:opacity-80 transition">
                        ✨ Rotina do Aventureiro
                    </h2>
                </Link>

                <div className="flex items-center gap-6 font-text text-deepTwilight">


                    <span className="font-title text-lg">
                        Lvl {user.level}
                    </span>


                    <span className="flex items-center gap-1">
                        <CurrencyDollarIcon className="w-5 h-5 text-yellow-500" />
                        {user.money}
                    </span>

                    <span className="flex items-center gap-1">
                        <FireIcon className="w-5 h-5 text-orange-500" />
                        {user.streak}
                    </span>


                    <span className="flex items-center gap-1">
                        <HeartIcon className="w-5 h-5 text-red-500" />
                        {user.lives}
                    </span>


                    <Link
                        href="/shop"
                        className="text-deepTwilight hover:underline hover:text-frierenBlue"
                    >
                        Loja
                    </Link>

                    <Link
                        href="/dashboard"
                        className="text-deepTwilight hover:underline hover:text-frierenBlue"
                    >
                        Missões
                    </Link>


                    <Link
                        href="/profile"
                        className="font-title text-deepTwilight hover:text-frierenBlue transition"
                    >
                        {user.name.toUpperCase()}
                    </Link>


                    <Button
                        onClick={logout}
                        className="px-4 py-2 bg-roseSoft hover:bg-lilacWhisper text-deepTwilight text-sm"
                    >
                        Sair
                    </Button>
                </div>

            </div>
        </header>
    );
}
