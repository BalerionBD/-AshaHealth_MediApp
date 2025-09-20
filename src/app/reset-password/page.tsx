'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleResetPassword = () => {
    // TODO: Implement actual password reset logic
    toast({
      title: "Password Reset Successfully",
      description: "You can now log in with your new password.",
    });
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleResetPassword}>
            Reset Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
