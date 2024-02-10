export interface User {
  id: string;
  name: string;
}

export interface UserResponse {
  users: User[];
  status: "idle" | "loading" | "suceeded" | "failed";
  error: any;
}
