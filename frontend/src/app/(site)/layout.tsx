import { Navbar } from "@/components/layout/Navbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-black text-white">
            <Navbar />
            {children}
        </div>
    );
}

