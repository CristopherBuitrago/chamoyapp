# 📂 Estructura del Proyecto (FSD con React + TS)

Este proyecto está organizado siguiendo la arquitectura **Feature-Sliced Design (FSD)**, 
lo que permite escalar y mantener el código de manera ordenada, separando la lógica 
por **funcionalidades (features)** y no por tipo de archivo.

---

## 🏗️ Estructura General

```
src/
  main.tsx
  index.css
  app/
    App.tsx
    providers/
    router/
  pages/
    contracts/
    templates/
    approvals/
    auth/
    admin/
  entities/
    contract/
  features/
    contract-upload/
    contract-submit-validation/
    contract-approve/
  widgets/
    dashboards/
  shared/
    api/
    config/
    ui/
    lib/
    security/
    store/
  styles/
  test/
```

---

## 📌 Descripción por Carpeta

### **app/**
Configuración y orquestación global de la aplicación:
- `App.tsx`: Punto de entrada principal del frontend.
- `providers/`: Providers globales (theme, query client, auth, etc.).
- `router/`: Configuración de rutas y navegación.

### **pages/**
Representan **pantallas completas** asociadas a rutas (ejemplo: `/contracts`, `/auth`).
- Orquestan **widgets**, **features** y **entities**.
- No deben contener lógica de negocio pesada.

### **widgets/**
Bloques grandes y reutilizables de UI, que combinan features o entities.
Ejemplos:
- `dashboards/`: panel de control con métricas, gráficos, KPIs.
- `contract-list/`: lista de contratos reutilizable.

### **features/**
Casos de uso independientes de negocio. Cada feature incluye:
- `ui/`: componentes propios del caso de uso.
- `model/`: hooks y estado específico.
- `api/`: llamadas HTTP relacionadas.

Ejemplos:
- `contract-upload/`: subir contratos al sistema.
- `contract-approve/`: aprobar un contrato.

### **entities/**
Representan objetos del dominio (ejemplo: **Contrato, Usuario, Cláusula**).
Contienen:
- Tipos y modelos (`types.ts`).
- Lógica de datos (queries con React Query).
- Componentes UI básicos (ejemplo: `ContractCard`).

### **shared/**
Contiene elementos transversales y reutilizables en todo el sistema:
- `api/`: cliente HTTP (`httpClient.ts`, interceptores, endpoints base).
- `ui/`: librería de componentes atómicos (botones, inputs, modales).
- `lib/`: funciones utilitarias (formateo de fechas, validaciones).
- `config/`: variables de entorno, constantes.
- `security/`: RBAC, guards, validación de permisos.
- `store/`: estado global (ejemplo: Zustand, Redux).

### **styles/**
Estilos globales, variables, configuración de Tailwind/CSS.

### **test/**
Mocks, utilidades y pruebas comunes.

---

## 🔄 Reglas de Dependencia

- `pages` → pueden usar `widgets`, `features`, `entities`, `shared`.
- `widgets` → pueden usar `features`, `entities`, `shared`.
- `features` → pueden usar `entities` y `shared`.
- `entities` → pueden usar solo `shared`.
- `shared` → **no depende de nadie más**.

Esto garantiza independencia y mantenibilidad.

---

## 🚀 Recomendaciones de Desarrollo

1. Mantener la lógica de negocio **solo en features/entities**.
2. Reutilizar componentes desde `shared/ui` en lugar de duplicar.

---

## ✅ Ejemplo de Flujo (Subir contrato)

1. `features/contract-upload/ui/UploadButton.tsx` → botón de subir contrato.  
2. `features/contract-upload/model/useUpload.ts` → hook que maneja el flujo.  
3. `features/contract-upload/api/upload.ts` → llamada HTTP al backend.  
4. `entities/contract/model/queries.ts` → invalida cache de lista de contratos.  
5. `pages/contracts/index.tsx` → muestra lista + botón de subir.  

---

## 📊 Beneficios de FSD en este proyecto

- Escalabilidad: cada módulo es independiente.
- Mantenibilidad: más fácil refactorizar sin romper todo.
- Trabajo en equipo: varios devs pueden trabajar en distintas features sin conflictos.
- Trazabilidad: cada caso de uso (feature) está aislado.

---

👨‍💻 **Tip:** Antes de empezar a desarrollar un feature nuevo, pregúntate:  
- ¿Es un caso de uso (feature)?  
- ¿Es un objeto de dominio (entity)?  
- ¿Es un bloque UI reutilizable (widget)?  
- ¿Es algo genérico (shared)?  
