"use client";

import { useRegisterViewModel } from "../lib/useRegisterViewModel";
import { Link } from "react-router-dom";

export function RegisterForm() {
  const { form, onSubmit } = useRegisterViewModel();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-brand p-8">
          
          {/* Logo */}
          <div
            className="mx-auto mb-8 w-24 h-24 rounded-full grid place-items-center text-ink/70"
            style={{
              background: "linear-gradient(135deg, #F1F1F2 0%, #7D85BF22 100%)",
            }}
          >
            <img src="/vite.svg" alt="logo" />
          </div>

          {/* Título */}
          <h1 className="text-2xl font-extrabold tracking-tight text-midnight mb-1 justify-center flex">
            Crear cuenta
          </h1>
          <p className="text-sm text-ink/60 mb-6 justify-center flex">
            Regístrate para gestionar tus documentos y contratos.
          </p>

          {/* Nombre */}
          <label className="block text-sm mb-1">Nombre completo</label>
          <input
            className="w-full h-11 rounded-md border border-line px-3 outline-none focus:ring-2 focus:ring-brand-primary"
            placeholder="Tu nombre"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>
          )}

          {/* Teléfono */}
          <label className="block text-sm mt-4 mb-1">Teléfono</label>
          <input
            className="w-full h-11 rounded-md border border-line px-3 outline-none focus:ring-2 focus:ring-brand-primary"
            placeholder="+57 300 000 0000"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
          )}

          {/* Email */}
          <label className="block text-sm mt-4 mb-1">Email</label>
          <input
            type="email"
            className="w-full h-11 rounded-md border border-line px-3 outline-none focus:ring-2 focus:ring-brand-primary"
            placeholder="tuemail@gmail.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
          )}

          {/* Contraseña */}
          <label className="block text-sm mt-4 mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full h-11 rounded-md border border-line px-3 outline-none focus:ring-2 focus:ring-brand-primary"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
          )}

          {/* Confirmar contraseña */}
          <label className="block text-sm mt-4 mb-1">Repetir contraseña</label>
          <input
            type="password"
            className="w-full h-11 rounded-md border border-line px-3 outline-none focus:ring-2 focus:ring-brand-primary"
            placeholder="••••••••"
            {...register("confirm")}
          />
          {errors.confirm && (
            <p className="text-xs text-red-600 mt-1">{errors.confirm.message}</p>
          )}

          {/* Botón de registro */}
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full h-11 mt-6 rounded-md bg-brand-primary text-white font-medium hover:brightness-110 disabled:opacity-60 transition"
          >
            {isSubmitting ? "Registrando..." : "Registrarme"}
          </button>

          {/* Link de redirección */}
          <div className="text-sm text-center mt-4">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/auth/login"
              className="text-brand-accent hover:underline"
            >
              Inicia sesión
            </Link>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
