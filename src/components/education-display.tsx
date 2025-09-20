import type { ProvideEducationalGuidanceOutput } from '@/ai/flows/provide-educational-guidance';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface EducationDisplayProps {
  guidance: ProvideEducationalGuidanceOutput;
}

export function EducationDisplay({ guidance }: EducationDisplayProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Educational Guidance</h3>
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Possible Causes</AccordionTrigger>
          <AccordionContent className="prose prose-sm max-w-none text-muted-foreground">
            {guidance.possibleCauses}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Home Care Tips</AccordionTrigger>
          <AccordionContent className="prose prose-sm max-w-none text-muted-foreground">
            {guidance.homeCareTips}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>When to See a Doctor (Red Flags)</AccordionTrigger>
          <AccordionContent className="prose prose-sm max-w-none text-muted-foreground">
            {guidance.redFlagSigns}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
