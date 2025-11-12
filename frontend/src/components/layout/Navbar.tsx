"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    return (
        <header className="w-full bg-transparent py-6 absolute top-0 left-0 z-50">
            <nav className="max-w-6xl mx-auto flex items-center justify-between px-6">
                <Link href="/" className="text-2xl font-bold text-green-400 tracking-wide">
                    Logo
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="secondary">Entrar</Button>
                    </Link>
                    <Link href="/register">
                        <Button>Começar Jornada</Button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

