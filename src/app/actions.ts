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
  const symptomDescription = { symptomDescription: validatedFields.data };

  try {
    const [summaryResult, guidanceResult, urgencyResult, flowchartResult] = await Promise.allSettled([
      summarizeSymptoms(symptomDescription),
      provideEducationalGuidance(symptomInput),
      triageUrgencyLevel(symptomInput),
      generateSymptomFlowchart(symptomInput),
    ]);

    // Log any errors without stopping the process
    if (summaryResult.status === 'rejected') console.error("Error in summarizeSymptoms:", summaryResult.reason);
    if (guidanceResult.status === 'rejected') console.error("Error in provideEducationalGuidance:", guidanceResult.reason);
    if (urgencyResult.status === 'rejected') console.error("Error in triageUrgencyLevel:", urgencyResult.reason);
    if (flowchartResult.status === 'rejected') console.error("Error in generateSymptomFlowchart:", flowchartResult.reason);

    // Proceed if at least one of the critical flows succeeded
    if (urgencyResult.status === 'rejected' && guidanceResult.status === 'rejected') {
        throw new Error("Both urgency and guidance flows failed.");
    }

    const analysisResult: AnalysisResult = {
      summary: summaryResult.status === 'fulfilled' ? summaryResult.value : { summary: 'Could not generate summary.' },
      guidance: guidanceResult.status === 'fulfilled' ? guidanceResult.value : { possibleCauses: 'N/A', homeCareTips: 'N/A', redFlagSigns: 'N/A' },
      urgency: urgencyResult.status === 'fulfilled' ? urgencyResult.value : { urgencyLevel: 'Yellow', reason: 'Could not determine urgency. Please consult a healthcare professional.' },
      flowchart: flowchartResult.status === 'fulfilled' ? flowchartResult.value : { flowchartCode: '' },
    };

    return { data: analysisResult };
  } catch (error) {
    console.error("Critical error in getHealthAnalysis:", error);
    return {
      error: 'An unexpected error occurred while analyzing your symptoms. Please try again later.',
    };
  }
}
