export interface User {
  username: string;
  email: string;
  avatar?: string;
}

export type RegisterRequest = {
    email: string;
    password: string;
};

export interface AuthUserData {
  username: string;
  email: string;
}