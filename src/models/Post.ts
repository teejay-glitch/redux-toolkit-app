export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: Reaction;
  body?: string;
}

export interface Reaction {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

export interface PostsResponse {
  posts: Post[];
  status: "idle" | "loading" | "suceeded" | "failed";
  error: any;
  count: number;
}

export interface PostRequest {
  id?: string;
  title: string;
  body: string;
  userId: string;
  reactions?: Reaction;
}
