import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto mt-20">
      <h2 className="text-2xl font-serif font-bold mb-6 text-center">FAQ</h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
          <AccordionContent>
            Yes. You can cancel your subscription at any time from your account
            settings.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Do you offer a free trial?</AccordionTrigger>
          <AccordionContent>
            We occasionally offer trials during special promotions.Stay tuned
            for updates.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            What payment methods do you accept?
          </AccordionTrigger>
          <AccordionContent>
            All major credit and debit cards are supported.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
