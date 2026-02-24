"use client";

import { useRouter } from "next/navigation";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ResetPasswordPageClientProps = {
  token: string;
};

export default function ResetPasswordPageClient({
  token,
}: ResetPasswordPageClientProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-87.5">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>
            Enter new password and confirm it to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm
            token={token}
            onSuccess={() => router.push("/sign-in")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
