import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Shell } from "../../widgets/shell/ui/Shell";

// Lazy loading de vistas
const LoginPage = lazy(() => import("../../pages/public/login/page").then(mod => ({ default: mod.default })))
const RegisterPage = lazy(() => import("../../pages/public/register/page").then(mod => ({ default: mod.default })))

// Vistas Cliente
const ClientHome = lazy(() => import("../../pages/client/home").then(m => ({ default: m.default })))
const ClientDocs = lazy(() => import("../../pages/client/account/documents").then(m => ({ default: m.default })))
const ClientContractsMine = lazy(() => import("../../pages/client/contracts/mine").then(m => ({ default: m.default })))
const ClientContractsReq = lazy(() => import("../../pages/client/contracts/request").then(m => ({ default: m.default })))
const ClientContractsState = lazy(() => import("../../pages/client/contracts/status").then(m => ({ default: m.default })))
const ClientContractsDisc = lazy(() => import("../../pages/client/contracts/discussion").then(m => ({ default: m.default })))

// Vistas Admin
const AdminHome = lazy(() => import("../../pages/admin/home").then(m => ({ default: m.default })))
const AdminSysUsers = lazy(() => import("../../pages/admin/system/users").then(m => ({ default: m.default })))
const AdminClients = lazy(() => import("../../pages/admin/clients/clients").then(m => ({ default: m.default })))
const AdminClientsContracts = lazy(() => import("../../pages/admin/clients/contracts").then(m => ({ default: m.default })))
const AdminReqPending = lazy(() => import("../../pages/admin/requests/pending").then(m => ({ default: m.default })))
const AdminReqSpecial = lazy(() => import("../../pages/admin/requests/special").then(m => ({ default: m.default })))
const AdminReqDiscussion = lazy(() => import("../../pages/admin/requests/discussion").then(m => ({ default: m.default })))
const AdminTechCreate = lazy(() => import("../../pages/admin/tech/create").then(m => ({ default: m.default })))
const AdminTechCreated = lazy(() => import("../../pages/admin/tech/created").then(m => ({ default: m.default })))
const AdminTechVisibility = lazy(() => import("../../pages/admin/tech/visibility").then(m => ({ default: m.default })))


export function AppRoutes() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Cargando…</div>}>
      <Routes>
        {/* Públicas */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* Protegidas (cliente) */}
        <Route
          path="/arenas/*"
          element={
            <Shell>
              <Routes>
                {/* VISTAS CLIENTE*/}

                {/* 1) Inicio */}
                <Route path="client/dashboard" element={<ClientHome />} />

                {/* 2) Mi cuenta */}
                <Route path="client/account/documents" element={<ClientDocs />} />

                {/* 3) Contratos */}
                <Route path="client/contracts/mine"       element={<ClientContractsMine />} />
                <Route path="client/contracts/request"    element={<ClientContractsReq />} />
                <Route path="client/contracts/status"     element={<ClientContractsState />} />
                <Route path="client/contracts/discussion" element={<ClientContractsDisc />} />

                {/* VISTAS PARA ADMIN */}
                <Route path="admin/dashboard" element={<AdminHome />} />

                {/* Configuración del sistema */}
                <Route path="admin/system/users" element={<AdminSysUsers />} />

                {/* Clientes */}
                <Route path="admin/clients"              element={<AdminClients />} />
                <Route path="admin/clients-contracts"    element={<AdminClientsContracts />} />

                {/* Gestión de solicitudes */}
                <Route path="admin/requests/pending"     element={<AdminReqPending />} />
                <Route path="admin/requests/special"     element={<AdminReqSpecial />} />
                <Route path="admin/requests/discussion"  element={<AdminReqDiscussion />} />

                {/* Panel técnico */}
                <Route path="admin/tech/create"          element={<AdminTechCreate />} />
                <Route path="admin/tech/created"         element={<AdminTechCreated />} />
                <Route path="admin/tech/visibility"      element={<AdminTechVisibility />} />

                {/* Fallback dentro de /arenas */}
                <Route path="*" element={<Navigate to="/arenas" replace />} />
              </Routes>
            </Shell>
          }
        />

        {/* Redirecciones */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </Suspense>
  )
}