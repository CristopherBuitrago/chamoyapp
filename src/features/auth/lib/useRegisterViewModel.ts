import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { register as registerApi } from "../api/auth"
import { setSession } from "./session"

const schema = z.object({
    fullName: z.string().min(3, "Ingresa tu nombre completo"),
    phone: z.string().optional(),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirm: z.string().min(6, "Mínimo 6 caracteres"),
    accept: z.literal(true, {
        message: "Debes aceptar términos y políticas",
    }),
}).refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Las contraseñas no coinciden",
})

export type RegisterFormValues = z.infer<typeof schema>

export function useRegisterViewModel() {
    const navigate = useNavigate()

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
            password: "",
            confirm: "",
        },
    })

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            const session = await registerApi({
                fullName: values.fullName,
                phone: values.phone,
                email: values.email,
                password: values.password,
            })
            setSession(session)               // << guarda sesión
            navigate("/start", { replace: true }) // << entra automáticamente
        } catch (e: any) {
            form.setError("email", { message: e.message ?? "Error al registrar" })
        }
    })

    return { form, onSubmit }
}
