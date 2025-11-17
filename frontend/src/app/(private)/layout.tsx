"use client";

import { ReactNode } from "react";
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

    return <>{children}</>;
}
