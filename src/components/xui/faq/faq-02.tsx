"use client";

import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I get started?",
    answer:
      "Sign up for a free account and follow the quick setup guide. You'll be up and running in just a few minutes.",
  },
  {
    id: "faq-2",
    question: "Can I cancel anytime?",
    answer:
      "Yes. There are no long-term contracts — you can upgrade, downgrade, or cancel your plan whenever you like.",
  },
  {
    id: "faq-3",
    question: "Do you offer a free trial?",
    answer:
      "Every paid plan comes with a 14-day free trial. No credit card required to get started.",
  },
  {
    id: "faq-4",
    question: "Is my data secure?",
    answer:
      "We use industry-standard encryption in transit and at rest, and never share your data with third parties.",
  },
];

export default function Faq02() {
  return (
    <section className="py-16 w-full" aria-labelledby="faq-02-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="text-center mb-10">
          <h2
            id="faq-02-heading"
            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3"
          >
            Questions & answers
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Everything you need to know before getting started.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800"
        >
          {FAQ_ITEMS.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-none">
              <AccordionTrigger className="hover:no-underline py-5 text-left text-base font-medium text-zinc-900 dark:text-zinc-100">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Still have questions?
          </p>
          <Button variant="outline" className="gap-2">
            <MessageCircle className="w-4 h-4" />
            Contact support
          </Button>
        </div>
      </div>
    </section>
  );
}
