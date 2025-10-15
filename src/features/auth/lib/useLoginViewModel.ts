"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../api/auth";
import type { LoginDTO } from "../../../entities/auth/model/roles";
import { useNavigate } from "react-router-dom";
import { setSession } from "../lib/session";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export function useLoginViewModel() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<null | { role: string }>(null);

  const form = useForm<LoginDTO>({
    resolver: zodResolver(schema),
    defaultValues: { email: "cliente@test.com", password: "password" }, // demo
    mode: "onBlur",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    setSuccess(null);
    try {
      const res = await login(values);

      // GUARDA la sesión (usuario + token + rol)
      setSession(res); // <— CLAVE

      setSuccess({ role: res.user.role });

      // Redirige al área protegida (la UI interna ya decidirá qué módulos ver)
      navigate("/arenas", { replace: true });
    } catch (e: any) {
      setServerError(e?.message ?? "Error desconocido");
    }
  });

  return {
    form,
    onSubmit,
    showPassword,
    toggleShowPassword: () => setShowPassword((s) => !s),
    serverError,
    success,
    demoInfo: {
      client: "cliente@test.com / password",
      admin: "admin@test.com / password",
    },
  };
}
