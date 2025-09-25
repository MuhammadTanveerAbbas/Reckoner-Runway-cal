
"use client";

import { useEffect, useState } from "react";
import { Linkedin, Github, Twitter } from "lucide-react";

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
            <Twitter size={24} />
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {year} Reckoner. All rights reserved.
        </p>
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
