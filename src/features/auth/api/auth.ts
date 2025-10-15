import type { LoginDTO, LoginResponse, RegisterDTO } from "../../../entities/auth/model/roles";

const USERS = new Map<string, { password: string; role: "client" | "admin"; name: string; phone?: string }>([
  ["cliente@test.com", { password: "password", role: "client", name: "Cliente Demo" }],
  ["admin@test.com",   { password: "password", role: "admin",  name: "Administrador" }],
])

// Login
export async function login(dto: LoginDTO): Promise<LoginResponse> {
  await new Promise((r) => setTimeout(r, 800));

  const found = USERS.get(dto.email)
  if (!found || found.password !== dto.password) {
    throw new Error("Credenciales inválidas")
  }

  return {
    user: {
      id: crypto.randomUUID(),
      email: dto.email,
      role: found.role,
      name: found.role === "admin" ? "Administrador" : "Cliente",
    },
    token: "mock-token-" + Math.random().toString(36).slice(2),
  };

}

// Register
export async function register(dto: RegisterDTO): Promise<LoginResponse> {
  await new Promise(r => setTimeout(r, 800))

  if (USERS.has(dto.email)) {
    throw new Error("El correo ya está registrado")
  }

  // guardamos al usuario nuevo como cliente
  USERS.set(dto.email, { password: dto.password, role: "client", name: dto.fullName, phone: dto.phone })

  // devolvemos una sesión para “auto-login”
  return {
    user: {
      id: crypto.randomUUID(),
      email: dto.email,
      role: "client",
      name: dto.fullName,
    },
    token: "mock-" + Math.random().toString(36).slice(2),
  }
}