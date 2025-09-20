// triage-urgency-level.ts
'use server';
/**
 * @fileOverview A triage AI agent that triages the urgency level of the symptoms (Green, Yellow, Red).
 *
 * - triageUrgencyLevel - A function that triages the urgency level of the symptoms.
 * - TriageUrgencyLevelInput - The input type for the triageUrgencyLevel function.
 * - TriageUrgencyLevelOutput - The return type for the triageUrgencyLevel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TriageUrgencyLevelInputSchema = z.object({
  symptoms: z.string().describe('The symptoms of the user.'),
});
export type TriageUrgencyLevelInput = z.infer<typeof TriageUrgencyLevelInputSchema>;

const TriageUrgencyLevelOutputSchema = z.object({
  urgencyLevel: z.enum(['Green', 'Yellow', 'Red']).describe('The urgency level of the symptoms.'),
  reason: z.string().describe('The reason for the urgency level.'),
});
export type TriageUrgencyLevelOutput = z.infer<typeof TriageUrgencyLevelOutputSchema>;

export async function triageUrgencyLevel(input: TriageUrgencyLevelInput): Promise<TriageUrgencyLevelOutput> {
  return triageUrgencyLevelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'triageUrgencyLevelPrompt',
  input: {schema: TriageUrgencyLevelInputSchema},
  output: {schema: TriageUrgencyLevelOutputSchema},
  prompt: `You are a medical professional triaging the urgency level of a patient's symptoms.

You will be provided with the patient's symptoms and you will determine the urgency level of the symptoms.

The urgency level can be Green, Yellow, or Red.

Green means the patient can wait for a scheduled appointment.
Yellow means the patient should be seen within a few days.
Red means the patient should be seen immediately.

Symptoms: {{{symptoms}}}

Urgency Level:`,
});

const triageUrgencyLevelFlow = ai.defineFlow(
  {
    name: 'triageUrgencyLevelFlow',
    inputSchema: TriageUrgencyLevelInputSchema,
    outputSchema: TriageUrgencyLevelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
