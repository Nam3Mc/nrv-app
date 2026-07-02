"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ApiError } from "@/core/types/api.types";
import { loginUser } from "@/features/auth/services/login.service";

export function LoginForm() {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError(null);
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);

        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        try {
            const response = await loginUser({
                email,
                password,
            });
            router.replace(response.redirectTo);
            router.refresh();

        } catch (error) {
            if (error instanceof ApiError) {
                setError(error.message);
                return;
            }

            setError("Unexpected login error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-slate-950">
                    Login
                </h1>

                <p className="mt-2 text-sm text-slate-600">
                    Access your pest control management system.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        disabled={isLoading}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/20 disabled:cursor-not-allowed disabled:bg-slate-100"
                        placeholder="admin@example.com"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-1 block text-sm font-medium text-slate-700"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        disabled={isLoading}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/20 disabled:cursor-not-allowed disabled:bg-slate-100"
                        placeholder="Enter your password"
                    />
                </div>
            </div>

            {error ? (
                <div
                    role="alert"
                    className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                    {error}
                </div>
            ) : null}

            <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full rounded-lg bg-green-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isLoading ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
}