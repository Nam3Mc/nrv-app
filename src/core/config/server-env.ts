import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
    API_BASE_URL: z.string().url(),

    AUTH_TOKEN_COOKIE_NAME: z.string().min(1),
    AUTH_ROLE_COOKIE_NAME: z.string().min(1),

    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
});

const parsedServerEnv = serverEnvSchema.safeParse({
    API_BASE_URL: process.env.API_BASE_URL,

    AUTH_TOKEN_COOKIE_NAME: process.env.AUTH_TOKEN_COOKIE_NAME,
    AUTH_ROLE_COOKIE_NAME: process.env.AUTH_ROLE_COOKIE_NAME,

    NODE_ENV: process.env.NODE_ENV,
});

if (!parsedServerEnv.success) {
    console.error(
        "Invalid server environment variables:",
        parsedServerEnv.error.flatten().fieldErrors,
    );

    throw new Error("Invalid server environment variables");
}

export const serverEnv = {
    api: {
        baseUrl: parsedServerEnv.data.API_BASE_URL,
    },

    auth: {
        tokenCookieName: parsedServerEnv.data.AUTH_TOKEN_COOKIE_NAME,
        roleCookieName: parsedServerEnv.data.AUTH_ROLE_COOKIE_NAME,
    },

    app: {
        isProduction: parsedServerEnv.data.NODE_ENV === "production",
        isDevelopment: parsedServerEnv.data.NODE_ENV === "development",
        isTest: parsedServerEnv.data.NODE_ENV === "test",
    },
} as const;