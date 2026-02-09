"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Params = {
  users: {
    name: string;
    email: string;
  }[];
  testPassword: string;
};

export default function LoginTestAccounts({ users, testPassword }: Params) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function logInAs(email: string) {
    setLoading(true);
    try {
      const response = await authClient.signIn.email({
        email,
        password: testPassword,
      });
      if (response.error) {
        window.alert(
          response.error.message ?? "Failed to sign in. Please try again.",
        );
        return;
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to log in as test account:", error);
      window.alert("An unexpected error occurred while signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full rounded-none max-h-[90vh] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Test Accounts</CardTitle>
      </CardHeader>
      <CardContent className="flex-col flex gap-2">
        {users.map((user) => (
          <Button
            key={user.email}
            variant={"outline"}
            onClick={() => logInAs(user.email)}
            disabled={loading}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              user.name
            )}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
