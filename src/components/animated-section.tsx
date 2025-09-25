
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

export function AnimatedSection({ children, className, ...props }: AnimatedSectionProps) {
    return (
        <motion.section
            className={cn(className)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            {children}
        </motion.section>
    );
}
