import { useMemo } from "react"
import type { Role } from "../../../entities/auth/model/roles"
import { navForRole } from "../../../entities/nav/model/nav"
import type { NavItem } from "../../../entities/nav/model/nav"

export function useSidebarNav(role: Role): NavItem[] {
  return useMemo(() => navForRole(role), [role])
}
