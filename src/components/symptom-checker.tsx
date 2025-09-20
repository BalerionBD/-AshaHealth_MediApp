'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getHealthAnalysis } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Mic, MicOff, AlertCircle } from 'lucide-react';
import { ResultsDisplay } from './results-display';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { useCallback, useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Analyze Symptoms'
      )}
    </Button>
  );
}

export function SymptomChecker() {
  const [state, formAction] = useFormState(getHealthAnalysis, null);
  const [symptomText, setSymptomText] = useState('');

  const handleTranscriptChange = useCallback((transcript: string) => {
    setSymptomText(prev => `${prev}${prev ? ' ' : ''}${transcript}`);
  }, []);

  const { isListening, startListening, stopListening } = useSpeechRecognition(handleTranscriptChange);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-muted/30">
          <CardTitle className="font-headline text-2xl">Symptom Checker</CardTitle>
          <CardDescription>
            Describe your symptoms below. Our AI assistant will provide a summary, educational guidance, and an urgency assessment.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form action={formAction} className="space-y-6">
            <div className="grid w-full gap-2">
              <Label htmlFor="symptoms">Your Symptoms</Label>
              <div className="relative">
                <Textarea
                  id="symptoms"
                  name="symptoms"
                  placeholder="e.g., I have a throbbing headache on one side of my head, and I feel nauseous..."
                  className="min-h-[120px] pr-12"
                  required
                  value={symptomText}
                  onChange={(e) => setSymptomText(e.target.value)}
                />
                <Button
                  type="button"
                  size="icon"
                  variant={isListening ? 'destructive' : 'ghost'}
                  className="absolute right-2 top-2 h-8 w-8"
                  onClick={isListening ? stopListening : startListening}
                  aria-label={isListening ? 'Stop listening' : 'Start listening'}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
               <div className="grid w-full sm:w-1/3 gap-2">
                <Label htmlFor="language">Language</Label>
                <Select name="language" defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <SubmitButton />
            </div>
            {state?.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>

      {useFormStatus().pending && (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-card p-8 text-center shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            <p className="text-muted-foreground">AI is analyzing your symptoms. Please wait...</p>
        </div>
      )}

      {state?.data && <ResultsDisplay analysis={state.data} />}
    </div>
  );
}
