import type { AnalysisResult } from "@/lib/types";
import { UrgencyDisplay } from "./urgency-display";
import { EducationDisplay } from "./education-display";
import { FlowchartDisplay } from "./flowchart-display";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

interface ResultsDisplayProps {
    analysis: AnalysisResult;
}

export function ResultsDisplay({ analysis }: ResultsDisplayProps) {
    return (
        <div className="space-y-8">
            <UrgencyDisplay urgency={analysis.urgency} />

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Your Health Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Symptom Summary</h3>
                        <p className="text-muted-foreground">{analysis.summary.summary}</p>
                    </div>

                    <Separator />
                    
                    <EducationDisplay guidance={analysis.guidance} />
                    
                    <Separator />

                    <FlowchartDisplay flowchart={analysis.flowchart} />
                </CardContent>
            </Card>
        </div>
    );
}
