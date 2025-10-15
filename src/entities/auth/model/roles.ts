export type Role = "admin" | "client";

export type LoginDTO = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: string;
    email: string;
    role: Role;
    name: string;
  };
  token: string;
};

export type RegisterDTO = {
  fullName: string
  phone?: string
  email: string
  password: string
}