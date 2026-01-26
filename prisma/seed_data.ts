export const testUserData: {
  email: string;
  name: string;
  password?: string;
  role:
    | "user"
    | "admin"
    | "writer"
    | "editor"
    | ("user" | "admin" | "writer" | "editor")[]
    | undefined;
}[] = [
  {
    email: "user@testing.com",
    name: "Test User",
    password: process.env.TESTING_PASSWORD,
    role: "user",
  },
  {
    email: "subscribed_user@testing.com",
    name: "Test Subscribed User",
    password: process.env.TESTING_PASSWORD,
    role: "user",
  },
  {
    email: "admin@testing.com",
    name: "Test Admin",
    password: process.env.TESTING_PASSWORD,
    role: "admin",
  },
  {
    email: "writer@testing.com",
    name: "Test Writer",
    password: process.env.TESTING_PASSWORD,
    role: "writer",
  },
  {
    email: "editor@testing.com",
    name: "Test Editor",
    password: process.env.TESTING_PASSWORD,
    role: "editor",
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
  "Doctors warn: ",
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
