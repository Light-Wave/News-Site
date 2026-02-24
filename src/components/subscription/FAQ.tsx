import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto mt-20 relative">
      {/* Section header */}
      <h2 className="metal-plate font-bold text-center text-2xl py-3 w-fit mx-auto px-10 mb-8 rounded-none sm:rounded-lg">
        <span className="text-magic-glint">Frequently Asked Questions</span>
      </h2>

      <div
        className="relative overflow-hidden rounded-lg border-2 border-amber-800/40 p-6 sm:p-8"
        style={{
          background:
            "linear-gradient(135deg, #f4e4bc 0%, #f8f0dc 50%, #e8d5a3 100%)",
        }}
      >
        {/* Decorative inset border */}
        <div className="absolute inset-3 border border-amber-700/15 rounded pointer-events-none" />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-amber-700/40" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-amber-700/40" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-amber-700/40" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-amber-700/40" />

        <Accordion type="single" collapsible className="relative z-10 w-full">
          <AccordionItem
            value="item-1"
            className="border-amber-700/20"
          >
            <AccordionTrigger className="text-amber-900/90 hover:text-amber-800 hover:no-underline font-semibold">
              Can I cancel my subscription at any time?
            </AccordionTrigger>
            <AccordionContent className="text-amber-900/70">
              Indeed, brave adventurer. You may relinquish your subscription at
              any time from your account sanctum. Your access shall remain until
              the end of the current billing cycle.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border-amber-700/20"
          >
            <AccordionTrigger className="text-amber-900/90 hover:text-amber-800 hover:no-underline font-semibold">
              Do you offer a free trial?
            </AccordionTrigger>
            <AccordionContent className="text-amber-900/70">
              From time to time, the Council of Elders decrees special
              promotional trials. Keep watch on our enchanted notice boards for
              such rare opportunities.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border-amber-700/20"
          >
            <AccordionTrigger className="text-amber-900/90 hover:text-amber-800 hover:no-underline font-semibold">
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent className="text-amber-900/70">
              We accept all major credit and debit scrolls. Our enchanted
              payment crystal also supports various digital coin purses for your
              convenience.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
