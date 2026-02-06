"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOut({ email }: { email: string }) {
  const router = useRouter();
  return (
    <div className="mb-4 text-center">
      <p className="text-sm text-muted-foreground">
        You are signed in as {email}
      </p>
      <Button
        onClick={async () => {
          await authClient.signOut();
          router.refresh();
        }}
        variant="outline"
      >
        Sign Out
      </Button>
    </div>
  );
}
