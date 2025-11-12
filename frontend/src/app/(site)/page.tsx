"use client";
import { useEffect } from "react";
import { api } from "@/services/api";

export default function Home() {
    useEffect(() => {
        api.get("/ping").then((res) => console.log(res.data));
    }, []);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
            <h1 className="text-5xl font-bold text-green-400 mb-3">
                Rotina do Aventureiro
            </h1>
            <p className="text-gray-300">Frontend conectado ao backend!</p>
        </main>
    );
}

