import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function HomePage() {
  return (
    <div
      className="
    relative min-h-screen
    bg-hero-bg bg-cover bg-center bg-fixed
    flex items-center justify-center
  "
    >

      <div className="absolute inset-0 bg-gradient-to-b from-[#4a6675]/50 to-[#e8f0f5]/30 backdrop-blur-[2px]" />


      <div className="relative z-10 w-full">
        <Container className="text-center space-y-6">
          <Heading size="lg">
            Rotina do Aventureiro ✨
          </Heading>

          <p className="text-deepTwilight/80 text-lg max-w-2xl mx-auto">
            Construa hábitos em um mundo leve, mágico e sereno — inspirado em Frieren.
          </p>

          <Link href="/login">
            <Button className="mt-4 px-10 py-4 text-lg">Começar Jornada</Button>
          </Link>
        </Container>
      </div>
    </div>
  );
}
