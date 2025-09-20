'use server';
/**
 * @fileOverview Educational guidance flow for symptoms.
 *
 * - provideEducationalGuidance - A function that provides educational information based on symptoms.
 * - ProvideEducationalGuidanceInput - The input type for the provideEducationalGuidance function.
 * - ProvideEducationalGuidanceOutput - The return type for the provideEducationalGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideEducationalGuidanceInputSchema = z.object({
  symptoms: z.string().describe('The symptoms described by the user.'),
});
export type ProvideEducationalGuidanceInput = z.infer<typeof ProvideEducationalGuidanceInputSchema>;

const ProvideEducationalGuidanceOutputSchema = z.object({
  possibleCauses: z.string().describe('Possible causes of the symptoms.'),
  homeCareTips: z.string().describe('Home care tips for managing the symptoms.'),
  redFlagSigns: z.string().describe('Red flag signs that require immediate medical attention.'),
});
export type ProvideEducationalGuidanceOutput = z.infer<typeof ProvideEducationalGuidanceOutputSchema>;

export async function provideEducationalGuidance(input: ProvideEducationalGuidanceInput): Promise<ProvideEducationalGuidanceOutput> {
  return provideEducationalGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideEducationalGuidancePrompt',
  input: {schema: ProvideEducationalGuidanceInputSchema},
  output: {schema: ProvideEducationalGuidanceOutputSchema},
  prompt: `You are a medical information specialist providing helpful information - not a diagnosis - based on the user's symptoms.

  Symptoms: {{{symptoms}}}

  Provide non-diagnostic information including:
  - Possible causes of the symptoms.
  - Home care tips for managing the symptoms.
  - Red flag signs that require immediate medical attention.
  `,
});

const provideEducationalGuidanceFlow = ai.defineFlow(
  {
    name: 'provideEducationalGuidanceFlow',
    inputSchema: ProvideEducationalGuidanceInputSchema,
    outputSchema: ProvideEducationalGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
