'use server';

/**
 * @fileOverview A symptom summarization AI agent.
 *
 * - summarizeSymptoms - A function that summarizes the symptom descriptions.
 * - SummarizeSymptomsInput - The input type for the summarizeSymptoms function.
 * - SummarizeSymptomsOutput - The return type for the summarizeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSymptomsInputSchema = z.object({
  symptomDescription: z
    .string()
    .describe('The description of the symptoms provided by the user.'),
});
export type SummarizeSymptomsInput = z.infer<typeof SummarizeSymptomsInputSchema>;

const SummarizeSymptomsOutputSchema = z.object({
  summary: z.string().describe('A plain language summary of the symptoms.'),
});
export type SummarizeSymptomsOutput = z.infer<typeof SummarizeSymptomsOutputSchema>;

export async function summarizeSymptoms(input: SummarizeSymptomsInput): Promise<SummarizeSymptomsOutput> {
  return summarizeSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSymptomsPrompt',
  input: {schema: SummarizeSymptomsInputSchema},
  output: {schema: SummarizeSymptomsOutputSchema},
  prompt: `You are a medical expert. Please summarize the following symptom description in plain language:

Symptom Description: {{{symptomDescription}}}`,
});

const summarizeSymptomsFlow = ai.defineFlow(
  {
    name: 'summarizeSymptomsFlow',
    inputSchema: SummarizeSymptomsInputSchema,
    outputSchema: SummarizeSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
