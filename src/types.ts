export type CardData = {
  data: Card;
};

export type Card = {
  id: string;
  date_created: string;
  date_updated: string | null;
  username: string;
  full_name: string;
  email: string;
};
