import type { Article } from "@/generated/prisma/client";

export const exampleArticle: Article[] = [
  {
    id: "1",
    headline: "Let sleeping dragons snooze",
    content: "",
    views: 0,
    summary:
      "Druids against the mistreatment of dragons report a rise in adventurer hunting parties disturbing the sleep of our reptilian friends. A spokesperson for the druids said 'The additional food supply is welcome, but the dragons need sleep too!'",
    image: "/placeholder-dragon.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "1",
    isActive: true,
  },
  {
    id: "2",
    headline: "Price of daggers rising",
    content: "",
    views: 13,
    summary:
      "A recent upswing in the rogue guild's activity has led to a shortage of daggers across the realm. Prices have risen by as much as 50% in some areas.",
    image: "/dragonplaceholder.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "1",
    isActive: true,
  },
];
