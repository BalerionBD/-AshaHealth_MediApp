'use server';

import { generateSymptomFlowchart } from '@/ai/flows/generate-symptom-flowchart';
import { provideEducationalGuidance } from '@/ai/flows/provide-educational-guidance';
import { summarizeSymptoms } from '@/ai/flows/summarize-symptoms';
import { triageUrgencyLevel } from '@/ai/flows/triage-urgency-level';
import type { AnalysisResult, FormState } from '@/lib/types';
import { z } from 'zod';

const symptomSchema = z.string().min(10, "Please describe your symptoms in at least 10 characters.");

export async function getHealthAnalysis(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const symptoms = formData.get('symptoms') as string;

  const validatedFields = symptomSchema.safeParse(symptoms);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  const symptomInput = { symptoms: validatedFields.data };

  try {
    const [summary, guidance, urgency, flowchart] = await Promise.all([
      summarizeSymptoms({ symptomDescription: validatedFields.data }),
      provideEducationalGuidance(symptomInput),
      triageUrgencyLevel(symptomInput),
      generateSymptomFlowchart(symptomInput),
    ]);
    
    const analysisResult: AnalysisResult = { summary, guidance, urgency, flowchart };

    return { data: analysisResult };
  } catch (error) {
    console.error(error);
    return {
      error: 'An unexpected error occurred while analyzing your symptoms. Please try again later.',
    };
  }
}
