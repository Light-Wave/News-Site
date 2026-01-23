import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  article: ["read", "create", "delete", "update"],
  category: ["create", "update", "delete"],
  subscriptionType: ["create", "update", "delete"],
  editorsChoice: ["create", "update", "delete"],
  signInEmail: ["admin"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  article: ["read"],
});

export const admin = ac.newRole({
  article: ["read", "create", "delete", "update"],
  category: ["create", "update", "delete"],
  subscriptionType: ["create", "update", "delete"],
  editorsChoice: ["create", "update", "delete"],
  ...adminAc.statements,
});

export const writer = ac.newRole({
  article: ["read", "create", "update"],
});

export const editor = ac.newRole({
  article: ["read", "update"],
  editorsChoice: ["create", "update", "delete"],
});
