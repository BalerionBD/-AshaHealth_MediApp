import type { GenerateSymptomFlowchartOutput } from "@/ai/flows/generate-symptom-flowchart";
import type { ProvideEducationalGuidanceOutput } from "@/ai/flows/provide-educational-guidance";
import type { SummarizeSymptomsOutput } from "@/ai/flows/summarize-symptoms";
import type { TriageUrgencyLevelOutput } from "@/ai/flows/triage-urgency-level";

export type AnalysisResult = {
    summary: SummarizeSymptomsOutput;
    guidance: ProvideEducationalGuidanceOutput;
    urgency: TriageUrgencyLevelOutput;
    flowchart: GenerateSymptomFlowchartOutput;
}

export type FormState = {
    data?: AnalysisResult;
    error?: string;
} | null;
