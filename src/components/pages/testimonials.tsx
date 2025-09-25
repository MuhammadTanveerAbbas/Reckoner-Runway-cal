
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Founder, TechSavvy",
    quote: "Reckoner gave us the clarity we needed to navigate our seed stage. It is simple, fast, and incredibly effective.",
  },
  {
    name: "Samantha Lee",
    role: "CFO, Creative Solutions",
    quote: "As a CFO, I appreciate tools that get straight to the point. This calculator is now a part of my weekly financial review.",
  },
  {
    name: "David Chen",
    role: "Indie Developer",
    quote: "Finally, a runway calculator that is not bloated with unnecessary features. It does one thing, and it does it perfectly.",
  },
];

export function Testimonials() {
    return (
        <AnimatedSection id="testimonials" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Trusted by Founders and Financial Experts</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">Do not just take our word for it. Here is what people are saying.</p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                          key={testimonial.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          <Card className="h-full">
                              <CardContent className="pt-6">
                                  <div className="space-y-4">
                                      <div>
                                          <p className="font-semibold">{testimonial.name}</p>
                                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                      </div>
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
                                      </div>
                                      <p className="text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                                  </div>
                              </CardContent>
                          </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}
