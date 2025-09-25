
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/icons/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2">
          <Logo className="h-6 w-6" />
          <span className="font-bold text-lg">Reckoner</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-muted-foreground transition-colors hover:text-foreground">About</a>
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-muted-foreground transition-colors hover:text-foreground">Features</a>
            <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="text-muted-foreground transition-colors hover:text-foreground">Testimonials</a>
            <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#calculator" onClick={(e) => scrollToSection(e, 'calculator')} className="hidden sm:block">
              <Button className="shadow-lg shadow-gray-500/10 transition-shadow hover:shadow-gray-500/20">Calculate Runway</Button>
          </a>
          <ThemeToggle />
           <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-muted-foreground hover:text-foreground">About</a>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-muted-foreground hover:text-foreground">Features</a>
                <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="text-muted-foreground hover:text-foreground">Testimonials</a>
                <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-muted-foreground hover:text-foreground">Pricing</a>
                <a href="#calculator" onClick={(e) => scrollToSection(e, 'calculator')}>
                  <Button className="w-full shadow-lg shadow-gray-500/10 transition-shadow hover:shadow-gray-500/20">Calculate Runway</Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
