export function QuestCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="
      bg-[#F6E6C4]
      text-[#3E3B39]
      p-5
      rounded-xl
      border-4 border-[#A15C2F]
      shadow-[0_0_20px_rgba(0,0,0,0.4)]
      font-medium
      bg-[url('/textures/parchment.png')]
      bg-cover
    ">
            {children}
        </div>
    );
}
