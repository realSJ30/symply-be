export interface CreateEventInput {
  userId: string;
  title: string;
  description?: string;
  date: string;
}

export interface UpdateEventInput {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
}
