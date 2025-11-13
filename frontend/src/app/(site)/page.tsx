export default function HomePage() {
    return (
        <div className="
      min-h-screen flex flex-col items-center justify-center
      text-center px-6
      bg-[url('/textures/hero-bg.jpg')] bg-cover bg-center
    ">
            <h1 className="
        text-6xl font-extrabold text-[#F6E6C4]
        drop-shadow-[0_5px_5px_rgba(0,0,0,0.7)]
      ">
                🗡️ Rotina do Aventureiro
            </h1>

            <p className="text-xl text-[#F6E6C4]/70 max-w-2xl mt-4">
                Entre em uma jornada épica onde suas tarefas diárias se tornam missões.
            </p>

            <a
                href="/login"
                className="
          mt-10 px-8 py-4 rounded-xl text-lg font-bold
          bg-[#7A2E1C] hover:bg-[#A15C2F]
          shadow-[0_0_20px_rgba(0,0,0,0.6)]
          transition
        "
            >
                Começar Aventura
            </a>
        </div>
    );
}
