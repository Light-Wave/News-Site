"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDistanceToNow } from "date-fns";
import { RoleDropdown } from "./Role-DropDown";
import { BanAction } from "./BanAction";

export function UserModeration({ users }: { users: any[] }) {
  const [search, setSearch] = useState("");

  // Search Logic: Filter name and email at the same time
  const filteredUsers = users.filter((user) => {
    const searchTerm = search.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6">
      {/* Search Bar & View All */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search by name or email..."
          value={search}
          aria-label="Search name or email"
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
        <Button
          variant="default"
          onClick={() => setSearch("")}
          disabled={!search}
        >
          View All
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="font-medium">{user.name || "Anonymous"}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-slate-500">{user.email}</div>
                </TableCell>
                <TableCell>
                  <RoleDropdown userId={user.id} currentRole={user.role} />
                </TableCell>
                <TableCell className="text-sm text-slate-500">
                  {user.lastActive
                    ? formatDistanceToNow(new Date(user.lastActive), {
                        addSuffix: true,
                      })
                    : "Never logged in"}
                </TableCell>
                <TableCell className="text-right">
                  <BanAction userId={user.id} isBanned={user.banned} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
