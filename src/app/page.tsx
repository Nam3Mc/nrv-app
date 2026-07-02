import { clientEnv } from "@/core/config/client-env";
import { LoginForm } from "@/features/auth/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Login | ${clientEnv.app.name}`,
  description: "Access the pest control management system.",
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <LoginForm />
    </main>
  )
}