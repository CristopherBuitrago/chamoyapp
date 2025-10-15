"use client";

import { Link } from "react-router-dom";
import { useLoginViewModel } from "../lib/useLoginViewModel";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const {
    form,
    onSubmit,
    showPassword,
    toggleShowPassword,
    serverError,
    success
  } = useLoginViewModel();

  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-brand p-8">
          <div className="mx-auto mb-8 w-24 h-24 rounded-full grid place-items-center text-ink/70" style={{ background: 'linear-gradient(135deg, #F1F1F2 0%, #7D85BF22 100%)' }}>
            <img src="/vite.svg" alt="logo" />
          </div>
          {/* Email */}
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full h-11 rounded-md border px-3 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="cliente@test.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="block text-sm mt-4 mb-1">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full h-11 rounded-md border pl-3 pr-10 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              {...register("password")}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
          )}

          {/* Error / success */}
          {serverError && (
            <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
              {serverError}
            </div>
          )}
          {success && (
            <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-3">
              Sesión iniciada. Rol: <b>{success.role}</b>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full h-11 mt-6 rounded-md bg-brand-primary text-white font-medium 
                   hover:brightness-110 disabled:opacity-60 transition"
          >
            {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
          </button>

          {/* Links */}
          <div className="text-sm text-center mt-4">
            <button className="text-brand-accent hover:underline">Olvidé mi contraseña</button>
          </div>
          <div className="text-sm text-center mt-2">
            ¿No tienes cuenta?{" "}
            <Link to="/auth/register" className="text-brand-accent hover:underline">Crea una aquí</Link>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
