import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentRole } from "../../../features/auth/lib/session";
import { Sidebar } from "../../../features/sidebar/ui/Sidebar";
import { useSidebarState } from "../model/useSidebarState";

type ShellProps = { children: React.ReactNode };

export function Shell({ children }: ShellProps) {
  const navigate = useNavigate();
  const { collapsed, toggle } = useSidebarState();
  const [role, setRole] = useState(getCurrentRole());

  // Si no hay rol devolver al login
  useEffect(() => {
    if (!role) navigate("/auth/login", { replace: true });
  }, [role, navigate]);

  // si cambian el storage (otra pestaña cierra sesión), actualizar
  useEffect(() => {
    const onStorage = () => setRole(getCurrentRole());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!role) return null;

  return (
    <div className="min-h-screen w-full bg-brand-ink text-white/90 overflow-x-hidden"> {/* <-- */}
      <div className="flex h-screen">
        <Sidebar role={role} collapsed={collapsed} onToggle={toggle} />
        <div className="flex-1 flex flex-col overflow-x-hidden"> {/* <-- */}
          <header className="h-24 border-b border-white/10 bg-ink backdrop-blur flex items-center px-4">
            <div className="text-sm tracking-wide text-white/80">Encabezado</div>
          </header>
          <main className="flex-1 bg-brand-ink/95 overflow-x-hidden">
            <div className="px-6 lg:px-8 max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
