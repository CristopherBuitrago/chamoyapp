import type { Role } from "../../auth/model/roles";

export type User = {
  id: string;
  email: string;
  role: Role;
  name?: string; // Nombre usuario
  token?: string; // Token
};
