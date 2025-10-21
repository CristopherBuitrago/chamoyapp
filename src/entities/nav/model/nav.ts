import type { Role } from "../../auth/model/roles"
import {
  Home,
  Settings,
  Users,
  User,
  UserCog,
  FileText,
  FilePlus2,
  FileClock,
  FileEdit,
  Eye,
  ClipboardList,
  ListChecks,
  MessageSquare,
  Wrench,
} from "lucide-react"

export type NavItem = {
  id: string
  label: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
  path?: string
  children?: NavItem[]
  visibleRoles?: Role[]
}

// Admin
export const NAV_ADMIN: NavItem[] = [
  { id: "home", label: "Inicio", icon: Home, path: "/arenas/admin/dashboard" },

  {
    id: "sys",
    label: "Configuración del sistema",
    icon: Settings,
    children: [
      {
        id: "sys-users",
        label: "Usuarios del sistema",
        icon: UserCog,
        path: "/arenas/admin/system/users",
      },
    ],
  },

  {
    id: "clients",
    label: "Clientes",
    icon: Users,
    children: [
      {
        id: "clients-registered",
        label: "Clientes registrados",
        icon: User,
        path: "/arenas/admin/clients",
      },
      {
        id: "clients-contracts",
        label: "Clientes y contratos",
        icon: ListChecks,
        path: "/arenas/admin/clients-contracts",
      },
    ],
  },

  {
    id: "requests",
    label: "Gestión de solicitudes",
    icon: ClipboardList,
    children: [
      {
        id: "req-pending",
        label: "Contratos pendientes",
        icon: ListChecks,
        path: "/arenas/admin/requests/pending",
      },
      {
        id: "req-special",
        label: "Contratos especiales",
        icon: FilePlus2,
        path: "/arenas/admin/requests/special",
      },
      {
        id: "req-discussion",
        label: "En discusión",
        icon: MessageSquare,
        path: "/arenas/admin/requests/discussion",
      },
    ],
  },

  {
    id: "tech",
    label: "Panel técnico",
    icon: Wrench,
    children: [
      {
        id: "tech-create",
        label: "Crear contrato",
        icon: FileEdit,
        path: "/arenas/admin/tech/create",
      },
      {
        id: "tech-created",
        label: "Contratos creados",
        icon: FileText,
        path: "/arenas/admin/tech/created",
      },
      {
        id: "tech-visibility",
        label: "Visualización de contratos",
        icon: Eye,
        path: "/arenas/admin/tech/visibility",
      },
    ],
  },
]

// Cliente
export const NAV_CLIENT: NavItem[] = [
  { id: "home", label: "Inicio", icon: Home, path: "/arenas/client/dashboard" },

  {
    id: "account",
    label: "Mi cuenta",
    icon: User,
    children: [
      {
        id: "account-docs",
        label: "Mis documentos",
        icon: ListChecks,
        path: "/arenas/client/account/documents",
      },
    ],
  },

  {
    id: "contracts",
    label: "Contratos",
    icon: FileText,
    children: [
      {
        id: "contracts-mine",
        label: "Mis solicitados",
        icon: FileText,
        path: "/arenas/client/contracts/mine",
      },
      {
        id: "contracts-request",
        label: "Solicitar contrato",
        icon: FilePlus2,
        path: "/arenas/client/contracts/request",
      },
      {
        id: "contracts-status",
        label: "Estado de mis contratos",
        icon: FileClock,
        path: "/arenas/client/contracts/status",
      },
      {
        id: "contracts-discussion",
        label: "En discusión",
        icon: MessageSquare,
        path: "/arenas/client/contracts/discussion",
      },
    ],
  },
]

export function navForRole(role: Role): NavItem[] {
  return role === "admin" ? NAV_ADMIN : NAV_CLIENT
}
