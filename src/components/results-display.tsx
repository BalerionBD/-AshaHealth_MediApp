import type { AnalysisResult } from "@/lib/types";
import { UrgencyDisplay } from "./urgency-display";
import { EducationDisplay } from "./education-display";
import { FlowchartDisplay } from "./flowchart-display";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { DownloadReport } from "./download-report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FileText } from "lucide-react";

interface ResultsDisplayProps {
    analysis: AnalysisResult;
}

export function ResultsDisplay({ analysis }: ResultsDisplayProps) {
    const showGuidance = analysis.guidance && (analysis.guidance.possibleCauses !== 'N/A');
    const showFlowchart = analysis.flowchart && analysis.flowchart.flowchartCode;

    return (
        <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="current">Current Analysis</TabsTrigger>
                <TabsTrigger value="history">Symptom History</TabsTrigger>
            </TabsList>
            <TabsContent value="current">
                <div id="report-content" className="space-y-8 mt-4">
                    <UrgencyDisplay urgency={analysis.urgency} />

                    <Card className="shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-headline text-2xl">Your Health Analysis</CardTitle>
                             <DownloadReport />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">Symptom Summary</h3>
                                <p className="text-muted-foreground">{analysis.summary.summary}</p>
                            </div>

                            {showGuidance && (
                                <>
                                    <Separator />
                                    <EducationDisplay guidance={analysis.guidance} />
                                </>
                            )}
                            
                            {showFlowchart && (
                               <>
                                <Separator />
                                <FlowchartDisplay flowchart={analysis.flowchart} />
                               </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="history">
                 <Card>
                    <CardHeader>
                        <CardTitle>Symptom History</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center h-64 space-y-4">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">Your past symptom checks will appear here.</p>
                        <p className="text-sm text-muted-foreground">(Feature coming soon)</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
