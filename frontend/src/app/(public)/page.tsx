export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-5xl font-bold text-green-400 drop-shadow-lg mb-4">
        ⚔️ Rotina do Aventureiro
      </h1>
      <p className="text-gray-300 text-lg max-w-xl mb-6">
        Transforme suas rotinas diárias em uma jornada épica.
      </p>
      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all">
        Começar Agora
      </button>
    </main>
  );
}
