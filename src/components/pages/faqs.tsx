
"use client";

import { HelpCircle } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is my financial data safe?",
    answer: "Absolutely. All calculations are performed directly in your browser. We never see, store, or transmit your financial data."
  },
  {
    question: "Is this tool really free?",
    answer: "Yes, Reckoner is completely free to use. Our goal is to provide a valuable tool to the startup community."
  },
  {
    question: "What is monthly burn?",
    answer: "Monthly burn, or burn rate, is the net amount of cash a company is spending each month. To calculate it, subtract your monthly revenue from your monthly expenses."
  },
  {
    question: "What does 'Cash in Bank' include?",
    answer: "This should be the total amount of cash your company has readily available in its bank accounts. It generally includes checking and savings accounts but not investments or other less liquid assets."
  },
  {
    question: "Can I use this for personal finance?",
    answer: "While designed for businesses, you can certainly use it for personal financial planning. Simply input your total savings as Cash in Bank and your net monthly spending as Monthly Burn."
  },
];

export function FAQs() {
    return (
        <AnimatedSection id="faq" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="mb-12 text-center">
                    <HelpCircle className="mx-auto h-12 w-12 text-primary" />
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mt-4">Frequently Asked Questions</h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">Have questions? We have answers.</p>
                </div>
                <div className="mx-auto max-w-3xl">
                    <Accordion type="single" collapsible className="w-full">
                       {faqs.map(faq => (
                         <AccordionItem key={faq.question} value={faq.question}>
                            <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                       ))}
                    </Accordion>
                </div>
            </div>
        </AnimatedSection>
    );
}
