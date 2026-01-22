import { Roles } from "@/generated/prisma/enums";

export const testUserData: {
  email: string;
  name: string;
  password: string;
  role: Roles;
}[] = [
  {
    email: "user@testing.com",
    name: "Test User",
    password: "password1234",
    role: Roles.USER,
  },
  {
    email: "subscribed_user@testing.com",
    name: "Test Subscribed User",
    password: "password1234",
    role: Roles.USER,
  },
  {
    email: "admin@testing.com",
    name: "Test Admin",
    password: "password1234",
    role: Roles.ADMIN,
  },
  {
    email: "writer@testing.com",
    name: "Test Writer",
    password: "password1234",
    role: Roles.WRITER,
  },
  {
    email: "editor@testing.com",
    name: "Test Editor",
    password: "password1234",
    role: Roles.EDITOR,
  },
];

export const clickbait_suffixes: string[] = [
  " - Then everything went wrong.",
  " - Could be illegal",
  ", then the unexpected happened.",
  ", thousands in danger!",
  " - What it means to you.",
  " - The secrets revealed!",
  " - Terrifying accounts from witnesses.",
];
export const clickbait_prefixes: string[] = [
  "Uncertain future - ",
  "Trump warns ",
  "Doctors warns: ",
  "The big question: ",
  "Team Better reveals: ",
];

export const premade_categories = [
  "Local",
  "Sweden",
  "World",
  "Weather",
  "Economy",
  "Sports",
  "Entertainment",
  "Technology",
];
