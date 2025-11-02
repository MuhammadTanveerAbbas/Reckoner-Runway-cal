"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, TechStart",
    content: "Reckoner gave me instant clarity on our runway. The growth projections helped us plan our next fundraise perfectly.",
    initials: "SC",
  },
  {
    name: "Michael Rodriguez",
    role: "CFO, GrowthCo",
    content: "Finally, a runway calculator that's both simple and powerful. The scenario comparison feature is a game-changer.",
    initials: "MR",
  },
  {
    name: "Emily Watson",
    role: "Startup Advisor",
    content: "I recommend Reckoner to all my portfolio companies. It's the fastest way to get financial clarity without spreadsheets.",
    initials: "EW",
  },
];

export function Testimonials() {
  return (
    <AnimatedSection id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Trusted by Founders
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl mt-4">
            See what users say about Reckoner
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            * Testimonials represent typical user experiences
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
                  <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
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
