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

const lightThemeVariables = {
  background: '#ffffff',
  primaryColor: '#F2F4F7',
  primaryTextColor: '#102A27',
  primaryBorderColor: '#A7D1AB',
  lineColor: '#4A5568',
  secondaryColor: '#F9D79D',
  tertiaryColor: '#F2F4F7',
  textColor: '#102A27',
  nodeBorder: '#A7D1AB',
};

const darkThemeVariables = {
  background: '#111827', // A dark background
  primaryColor: '#1F2937',
  primaryTextColor: '#F9FAFB',
  primaryBorderColor: '#A7D1AB',
  lineColor: '#9CA3AF',
  secondaryColor: '#F9D79D',
  tertiaryColor: '#374151',
  textColor: '#F9FAFB', // Light text for dark background
  nodeBorder: '#A7D1AB',
};

export function FlowchartDisplay({ flowchart }: FlowchartDisplayProps) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const id = useId();
  const graphId = `mermaid-graph-${id}`;

  useEffect(() => {
    // Detect system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: theme === 'dark' ? darkThemeVariables : lightThemeVariables,
    });

    const renderFlowchart = async () => {
      setError(null);
      setSvg(null);

      if (!flowchart.flowchartCode) {
        setError("No flowchart code was generated.");
        return;
      }

      try {
        if (await mermaid.parse(flowchart.flowchartCode)) {
          const { svg } = await mermaid.render(graphId, flowchart.flowchartCode);
          if (isMounted) {
            setSvg(svg);
          }
        }
      } catch (e) {
        console.error("Mermaid rendering error:", e);
        if (isMounted) {
          setError('Could not render flowchart. The generated code may be invalid.');
        }
      }
    };

    renderFlowchart();

    return () => {
      isMounted = false;
    };
  }, [flowchart.flowchartCode, graphId, theme]);

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
