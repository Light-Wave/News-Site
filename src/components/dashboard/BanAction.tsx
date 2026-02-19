"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toggleUserBan } from "@/actions/action-adminUser";

export function BanAction({
  userId,
  isBanned,
}: {
  userId: string;
  isBanned: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleUserBan(userId, isBanned);
      if (result?.success) {
        toast.success(isBanned ? "User unbanned" : "User banned for 7 days");
      } else {
        toast.error("Failed to update status");
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={isBanned ? "outline" : "destructive"}>
          {isBanned ? "Unban User" : "Ban User"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>
            {isBanned
              ? "Are you sure? This will restore user access immediately."
              : "This will ban the user for 7 days for 'Account under review'. They will be automatically logged out."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleToggle}
            disabled={isPending}
            className={isBanned ? "bg-primary" : "bg-destructive text-white"}
          >
            {isPending ? "Processing..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
