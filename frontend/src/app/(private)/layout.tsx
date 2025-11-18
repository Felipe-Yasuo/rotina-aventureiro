"use client";

import { ReactNode } from "react";
import { Header } from "@/components/dashboard/Header";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function PrivateLayout({ children }: { children: ReactNode }) {
    const { loading } = useProtectedRoute();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-deepTwilight">
                Carregando...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cloudWhite text-deepTwilight">
            <Header />
            <main className="max-w-6xl mx-auto px-6 py-10">
                {children}
            </main>
        </div>
    );
}
