"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toggleUserBan } from "@/actions/action-admin";

interface UserModerationRow {
  id: string | number;
  name: string;
  email: string;
  role: string | null;
  banned?: boolean | null;
}

export function UserModeration({ users }: { users: UserModerationRow[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-bold text-slate-800 text-sm">User Moderation</h3>
        <button className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold uppercase text-slate-500">
          View All
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="h-10 text-[11px] font-bold">USER</TableHead>
            <TableHead className="h-10 text-[11px] font-bold">EMAIL</TableHead>
            <TableHead className="h-10 text-[11px] font-bold">ROLE</TableHead>
            <TableHead className="h-10 text-right text-[11px] font-bold">
              ACTION
            </TableHead>
            <TableHead className="h-10 text-right text-[11px] font-bold">
              CHANGE ROLE
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id} className="hover:bg-slate-50/50">
              <TableCell className="font-medium">{u.name}</TableCell>
              <TableCell className="text-slate-500">{u.email}</TableCell>

              <TableCell className="py-2">
                <Badge className="text-[10px] uppercase h-5">{u.role}</Badge>
              </TableCell>
              <TableCell className="py-2 text-right">
                <button
                  onClick={() => toggleUserBan(u.id.toString(), !!u.banned)}
                  className={`text-[11px] font-bold underline ${u.banned ? "text-green-600" : "text-red-500"}`}
                >
                  {u.banned ? "Unban" : "Ban"}
                </button>
              </TableCell>
              <TableCell className="text-right">
                <button className="text-blue-600 text-xs font-bold">
                  Edit
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
