import { config } from 'dotenv';
config();

import '@/ai/flows/generate-symptom-flowchart.ts';
import '@/ai/flows/triage-urgency-level.ts';
import '@/ai/flows/summarize-symptoms.ts';
import '@/ai/flows/provide-educational-guidance.ts';