import { useMemo } from "react"
import type { AppRole } from "../../auth/lib/session"
import { navForRole } from "../../../entities/nav/model/nav"
import type { NavItem } from "../../../entities/nav/model/nav"

export function useSidebarNav(role: AppRole): NavItem[] {
  return useMemo(() => navForRole(role), [role])
}
