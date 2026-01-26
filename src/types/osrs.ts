export interface Root {
  item: Item;
}

export interface Item {
  icon: string;
  icon_large: string;
  id: number;
  type: string;
  typeIcon: string;
  name: string;
  description: string;
  current: Current;
  today: Today;
  members: string;
  day30: Day30;
  day90: Day90;
  day180: Day180;
}

export type ItemSummary = Pick<
  Item,
  "icon" | "icon_large" | "name" | "current" | "day30"
>;

export interface Current {
  trend: string;
  price: string;
}

export interface Today {
  trend: string;
  price: string;
}

export interface Day30 {
  trend: string;
  change: string;
}

export interface Day90 {
  trend: string;
  change: string;
}

export interface Day180 {
  trend: string;
  change: string;
}
