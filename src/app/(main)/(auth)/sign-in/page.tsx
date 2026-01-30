import SignIn from "./_components/sign-in";
import { SignUp } from "./_components/sign-up";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import SignOut from "./_components/sign-out";
import LoginTestAccounts from "./_components/test_accounts";
import prisma from "@/lib/prisma";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const testAccounts = await prisma.user.findMany({
    where: { email: { endsWith: "@testing.com" } },
    select: { email: true, name: true },
  });
  return (
    <div className="w-full">
      <div className="flex items-center flex-col justify-center w-full md:py-10">
        {session?.user ? (
          <SignOut email={session.user.email} />
        ) : (
          <div className="w-full max-w-md">
            <Tabs defaultValue="sign-in" className="w-100">
              <TabsList>
                <TabsTrigger value="sign-in">Sign in</TabsTrigger>
                <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                {process.env.NODE_ENV !== "production" && (
                  <TabsTrigger value="test_accounts">Test Accounts</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="sign-in">
                <SignIn />
              </TabsContent>
              <TabsContent value="sign-up">
                <SignUp />
              </TabsContent>
              {process.env.NODE_ENV !== "production" && (
                <TabsContent value="test_accounts">
                  <LoginTestAccounts
                    users={testAccounts}
                    testPassword={process.env.TESTING_PASSWORD || ""}
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
