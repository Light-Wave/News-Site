"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type Params = {
  users: {
    name: string;
    email: string;
  }[];
  testPassword: string;
};

export default function LoginTestAccounts({ users, testPassword }: Params) {
  const router = useRouter();
  async function logInAs(email: string) {
    console.log(`Logging in as ${email} with password ${testPassword}`);
    const response = await authClient.signIn.email({
      email,
      password: testPassword,
    });
    if (!response.error) {
      router.refresh();
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
          >
            {user.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
