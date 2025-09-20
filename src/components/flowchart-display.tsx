'use client';

import type { GenerateSymptomFlowchartOutput } from '@/ai/flows/generate-symptom-flowchart';
import mermaid from 'mermaid';
import { useEffect, useState, useId } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Button } from './ui/button';
import { ChevronsUpDown, Code } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface FlowchartDisplayProps {
  flowchart: GenerateSymptomFlowchartOutput;
}

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    background: '#ffffff',
    primaryColor: '#A7D1AB',
    primaryTextColor: '#102A27',
    primaryBorderColor: '#A7D1AB',
    lineColor: '#4A5568',
    secondaryColor: '#F9D79D',
    tertiaryColor: '#F2F4F7',
  }
});

export function FlowchartDisplay({ flowchart }: FlowchartDisplayProps) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const id = useId();
  const graphId = `mermaid-graph-${id}`;

  useEffect(() => {
    let isMounted = true;
    const renderFlowchart = async () => {
      setError(null);
      setSvg(null);
      if (!flowchart.flowchartCode) {
        setError("No flowchart code was generated.");
        return;
      }
      try {
        // This is a workaround to prevent mermaid from throwing an error that can't be caught.
        // See: https://github.com/mermaid-js/mermaid/issues/4323
        await mermaid.parse(flowchart.flowchartCode);
        const { svg } = await mermaid.render(graphId, flowchart.flowchartCode);
        if (isMounted) {
          setSvg(svg);
        }
      } catch (e) {
        console.error(e);
        if (isMounted) {
          setError('Could not render flowchart. The generated code may be invalid.');
        }
      }
    };
    renderFlowchart();
    return () => {
      isMounted = false;
    };
  }, [flowchart.flowchartCode, graphId]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Symptom Progression Flowchart</h3>
      <div className="rounded-lg border bg-card p-4 overflow-auto min-h-[150px]">
        {svg ? (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        ) : error ? (
            <p className="text-destructive">{error}</p>
        ): (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-3/4" />
          </div>
        )}
      </div>

      <Collapsible className="mt-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <Code className="h-4 w-4 mr-2" />
            View Flowchart Code
            <ChevronsUpDown className="h-4 w-4 ml-2" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <pre className="mt-2 rounded-md bg-muted p-4 overflow-x-auto">
            <code className="font-code text-sm text-foreground">{flowchart.flowchartCode || "No flowchart code available."}</code>
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
