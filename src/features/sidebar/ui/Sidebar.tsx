import { ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { navForRole } from "../../../entities/nav/model/nav";
import type { Role } from "../../../entities/auth/model/roles";

type SidebarProps = {
  role: Role;
  collapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ role, collapsed, onToggle }: SidebarProps) {
  const navItems = navForRole(role); // Filtrar por rol

  return (
    <aside
      className={[
        "h-full border-r border-white/10 bg-ink text-white/90",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-[100px]" : "w-[230px]",
        "flex flex-col",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-center transition-all duration-300 p-2",
          collapsed ? "py-2" : "py-2",
        ].join(" ")}
      >
        <img
          src=""
          alt="logo"
          className={[
            "transition-all duration-300 ease-in-out",
            collapsed ? "w-[100px]" : "w-[160px]",
          ].join(" ")}
        />
      </div>

      {/* Render dinámico de módulos */}
      <nav className="flex-1 px-2 py-2 space-y-1">
        {navItems.map((item) => (
          <SidebarItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="py-4 flex items-center justify-center">
        <button
          onClick={onToggle}
          className="rounded-full bg-white/10 hover:bg-white/20 transition p-2"
          aria-label={collapsed ? "Expandir" : "Colapsar"}
          title={collapsed ? "Expandir" : "Colapsar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
