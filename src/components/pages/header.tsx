
"use client";

import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { Github } from "lucide-react";

export function Header() {

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo className="h-6 w-6" />
          <span className="font-semibold text-lg text-white">Reckoner</span>
        </Link>

        <a 
          href="https://github.com/muhammadtanveerabbas/Reckoner-Runway-cal" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white/5 transition-colors text-white/90"
        >
          <Github className="h-5 w-5" />
          <span className="text-sm font-medium hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
}
