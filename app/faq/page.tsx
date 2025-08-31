"use client"

import { Nav } from "@/components/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-heading text-3xl">FAQ</h1>
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="fleet">
            <AccordionTrigger>What vehicles are in your fleet?</AccordionTrigger>
            <AccordionContent>
              We offer Sedans, SUVs, and Luxury class vehicles. All are maintained to premium standards.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pricing">
            <AccordionTrigger>How is pricing calculated?</AccordionTrigger>
            <AccordionContent>
              Transparent, fixed fare shown before booking. Pricing varies by distance, time, and vehicle class.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cancel">
            <AccordionTrigger>What is the cancellation policy?</AccordionTrigger>
            <AccordionContent>
              Free cancellations until 1 hour before pickup. Late cancellations may incur a partial fee.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  )
}
