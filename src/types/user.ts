export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
  isVerified: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}