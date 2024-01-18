export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: Reaction;
}

export interface Reaction {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}
