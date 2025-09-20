'use server';
/**
 * @fileOverview Generates a flowchart based on user-provided symptoms using GenAI.
 *
 * - generateSymptomFlowchart - A function that generates a symptom flowchart.
 * - GenerateSymptomFlowchartInput - The input type for the generateSymptomFlowchart function.
 * - GenerateSymptomFlowchartOutput - The return type for the generateSymptomFlowchart function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSymptomFlowchartInputSchema = z.object({
  symptoms: z.string().describe('The symptoms provided by the user.'),
});
export type GenerateSymptomFlowchartInput = z.infer<typeof GenerateSymptomFlowchartInputSchema>;

const GenerateSymptomFlowchartOutputSchema = z.object({
  flowchartCode: z
    .string()
    .describe(
      'The Mermaid code for the flowchart representing the potential progression of the symptoms.'
    ),
});
export type GenerateSymptomFlowchartOutput = z.infer<typeof GenerateSymptomFlowchartOutputSchema>;

export async function generateSymptomFlowchart(
  input: GenerateSymptomFlowchartInput
): Promise<GenerateSymptomFlowchartOutput> {
  return generateSymptomFlowchartFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSymptomFlowchartPrompt',
  input: {schema: GenerateSymptomFlowchartInputSchema},
  output: {schema: GenerateSymptomFlowchartOutputSchema},
  prompt: `You are a medical expert who can translate symptoms into a flowchart.

  Based on the following symptoms: {{{symptoms}}},
  generate a Mermaid code flowchart that visually represents the potential progression of the symptoms and related information.
  Make the flowchart readable and easy to understand for users with no medical background.
  The output should be the mermaid code only, without any additional explanations.
  
  **CRITICAL RULES FOR MERMAID SYNTAX:**
  - **NO NEWLINES IN NODES:** All text within a node (e.g., A["..."]) MUST be on a single line. Do NOT use '\n' or line breaks inside node labels.
    - **Incorrect:** A["Line 1\nLine 2"]
    - **Correct:**   A["Line 1 and Line 2"]
  - **QUOTE SPECIAL CHARACTERS:** If node text contains parentheses, colons, or other special characters, it MUST be enclosed in double quotes. For example: A["Node with (special chars): Text"]
  - **NO MARKDOWN:** Do not use any markdown formatting like bolding or italics within nodes.
  `,
});

const generateSymptomFlowchartFlow = ai.defineFlow(
  {
    name: 'generateSymptomFlowchartFlow',
    inputSchema: GenerateSymptomFlowchartInputSchema,
    outputSchema: GenerateSymptomFlowchartOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
