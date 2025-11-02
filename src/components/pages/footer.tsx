
"use client";

import { useEffect, useState } from "react";
import { Linkedin, Github } from "lucide-react";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t p-6">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:px-6">
        <div className="flex justify-center space-x-6">
          <a href="https://linkedin.com/in/muhammadtanveerabbas" target="_blank" rel="noopener noreferrer" className="text-foreground transition-colors duration-200 hover:text-muted-foreground">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/muhammadtanveerabbas" target="_blank" rel="noopener noreferrer" className="text-foreground transition-colors duration-200 hover:text-muted-foreground">
            <Github size={24} />
          </a>
          <a href="https://x.com/m_tanveerabbas" target="_blank" rel="noopener noreferrer" className="text-foreground transition-colors duration-200 hover:text-muted-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>

        <a
          href="https://muhammadtanveerabbas.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Made by Muhammad Tanveer Abbas
        </a>
      </div>
    </footer>
  );
}
