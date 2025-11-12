import { Button } from "@/components/ui/Button";

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-400 drop-shadow-lg mb-4">
                Rotina do Aventureiro
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8">
                Transforme suas tarefas diárias em uma jornada épica.
                Suba de nível, ganhe recompensas e conquiste seus objetivos!
            </p>

            <Button className="text-lg px-8 py-4">Comece Agora</Button>
        </main>
    );
}

