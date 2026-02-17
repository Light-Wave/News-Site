"use client";

import { useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updateUserRole } from "@/actions/action-admin";

interface RoleDropdownProps {
  userId: string;
  currentRole: string;
}

export function RoleDropdown({ userId, currentRole }: RoleDropdownProps) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (newRole: string) => {
    // startTransition keeps the UI responsive while the server works
    startTransition(async () => {
      const result = await updateUserRole(userId, newRole.toLowerCase());

      if (result?.success) {
        toast.success(`Success! User is now updated to ${newRole}`);
      } else {
        toast.error(
          result?.message
            ? `Failed: ${result.message}`
            : "Failed to update status",
        );
      }
    });
  };

  return (
    <Select
      disabled={isPending}
      defaultValue={currentRole}
      onValueChange={handleRoleChange}
    >
      <SelectTrigger className="w-28 h-8 text-xs focus:ring-0">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="user">User</SelectItem>
        <SelectItem value="writer">Writer</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
      </SelectContent>
    </Select>
  );
}
