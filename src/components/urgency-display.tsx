import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import type { TriageUrgencyLevelOutput } from '@/ai/flows/triage-urgency-level';

interface UrgencyDisplayProps {
  urgency: TriageUrgencyLevelOutput;
}

const urgencyConfig = {
  Green: {
    title: 'Low Urgency',
    icon: ShieldCheck,
    className: 'bg-green-100 border-green-300 text-green-900 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200',
    iconClassName: 'text-green-500',
  },
  Yellow: {
    title: 'Medium Urgency',
    icon: Shield,
    className: 'bg-yellow-100 border-yellow-300 text-yellow-900 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-200',
    iconClassName: 'text-yellow-500',
  },
  Red: {
    title: 'High Urgency',
    icon: ShieldAlert,
    className: 'bg-red-100 border-red-300 text-red-900 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200',
    iconClassName: 'text-red-500',
  },
};

export function UrgencyDisplay({ urgency }: UrgencyDisplayProps) {
  const config = urgencyConfig[urgency.urgencyLevel] || urgencyConfig.Yellow;
  const Icon = config.icon;

  return (
    <Card className={cn('shadow-lg border-2', config.className)}>
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Icon className={cn('h-8 w-8', config.iconClassName)} />
        <CardTitle className="font-headline text-2xl">{config.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium">{urgency.reason}</p>
      </CardContent>
    </Card>
  );
}
