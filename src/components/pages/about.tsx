
import { AnimatedSection } from "@/components/animated-section";

export function About() {
    return (
        <AnimatedSection id="about" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
            <div className="container mx-auto grid items-center gap-6 px-4 md:px-6">
                <div className="flex flex-col justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Our Mission</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Empowering Financial Foresight</h2>
                        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                           Reckoner was born from a simple need: a straightforward tool to calculate financial runway. We believe every founder, manager, and planner should have instant access to this critical metric without navigating complex spreadsheets or expensive software. Our mission is to provide clarity and empower better decision making for businesses of all sizes.
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
