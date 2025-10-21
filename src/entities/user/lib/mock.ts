import type { Role } from "../../auth/model/roles";
import type { User } from "../model/types";

const DATA: User[] = [
  {
    id: 23,
    name: "Cristopher Buitrago",
    email: "cristopher@gmail.com",
    phone: "+57 300 000 0000",
    role: "admin",
  },
  {
    id: 24,
    name: "Jose Tarazona",
    email: "josetarazona@gmail.com",
    phone: "+57 301 111 1111",
    role: "admin",
  },
  {
    id: 25,
    name: "Carmen Bolivar",
    email: "carmenbolivar3438@gmail.com",
    phone: "+57 302 222 2222",
    role: "superadmin",
  },
];

const ROLE_COLORS: Record<Role, string> = {
  admin: "blue",
  superadmin: "gold",
  client: "green",
};

export { DATA, ROLE_COLORS };