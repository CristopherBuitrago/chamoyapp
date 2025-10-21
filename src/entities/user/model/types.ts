import type { Role } from "../../auth/model/roles";

export type User = {
  id: number;
  email: string;
  role: Role;
  phone?: string;
  name?: string; // Nombre usuario
  token?: string; // Token
};
