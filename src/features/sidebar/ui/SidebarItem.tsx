import { NavLink } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"
import type { NavItem } from "../../../entities/nav/model/nav"

type Props = { item: NavItem; collapsed: boolean }

export function SidebarItem({ item, collapsed }: Props) {
  const [open, setOpen] = useState(false)
  const Icon = item.icon
  const panelId = useId()

  //Grupo con subitems
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  // Maneja altura con medición del contenido (scrollHeight)
  useEffect(() => {
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    // Al abrir: de la altura actual a la altura del contenido
    if (open && !collapsed) {
      const target = inner.scrollHeight
      wrap.style.height = wrap.clientHeight + "px" // punto de partida
      // siguiente frame: altura objetivo (smooth)
      requestAnimationFrame(() => {
        wrap.style.height = target + "px"
        wrap.style.opacity = "1"
      })
    } else {
      // Al cerrar (o al colapsar el sidebar): transiciona a 0
      wrap.style.height = wrap.clientHeight + "px"
      requestAnimationFrame(() => {
        wrap.style.height = "0px"
        wrap.style.opacity = "0"
      })
    }
  }, [open, collapsed])

  // Al finalizar la transición, fija "auto" cuando está abierto para permitir contenido dinámico
  function onTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.propertyName !== "height") return
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return
    if (open && !collapsed) {
      wrap.style.height = "auto"
    }
  }

  // Ítem hoja
  if (item.path) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          [
            "flex items-start gap-3 rounded-md px-3 py-2 transition-colors",
            isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/10",
            collapsed ? "justify-center" : "",
          ].join(" ")
        }
        title={collapsed ? item.label : undefined}
      >
        {Icon && <Icon size={18} className="flex-shrink-0 mt-[2px]" />}
        {!collapsed && (
          <span className="text-sm leading-tight break-words text-left flex-1">
            {item.label}
          </span>
        )}
      </NavLink>
    )
  }

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(o => !o)}
        className={[
          "w-full flex items-start",
          collapsed ? "justify-center px-0" : "justify-between px-3",
          "py-2 text-white/80 hover:bg-white/10 rounded-md transition-colors",
        ].join(" ")}
        title={collapsed ? item.label : undefined}
        aria-expanded={open && !collapsed}
        aria-controls={panelId}
      >
        <div className={["flex items-start gap-3", collapsed ? "justify-center" : ""].join(" ")}>
          {Icon && <Icon size={18} className="flex-shrink-0 mt-[2px]" />}
          {!collapsed && (
            <span className="text-sm leading-tight break-words text-left flex-1">
              {item.label}
            </span>
          )}
        </div>

        {!collapsed && (
          <ChevronDown
            size={16}
            className={`mt-[2px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {/* Contenedor animado */}
      <div
        id={panelId}
        ref={wrapRef}
        onTransitionEnd={onTransitionEnd}
        className="ml-8 overflow-hidden opacity-0"
        style={{
          height: 0,
          transition: "height 200ms ease-out, opacity 180ms ease-out",
        }}
      >
        <div ref={innerRef}>
          {item.children && (
            <div className="flex flex-col gap-1 py-1">
              {item.children.map(child => {
                const ChildIcon = child.icon
                return (
                  <NavLink
                    key={child.id}
                    to={child.path!}
                    className={({ isActive }) =>
                      [
                        "flex items-start gap-2 rounded-md px-2 py-1 transition-colors",
                        isActive ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/10",
                      ].join(" ")
                    }
                  >
                    {ChildIcon && <ChildIcon size={16} className="flex-shrink-0 mt-[1px]" />}
                    <span className="text-sm leading-tight">{child.label}</span>
                  </NavLink>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
