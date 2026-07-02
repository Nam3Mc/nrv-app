import { z } from "zod";

const clientEnvSchema = z.object({
    NEXT_PUBLIC_APP_NAME: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().url(),
});

const parsedClientEnv = clientEnvSchema.safeParse({
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!parsedClientEnv.success) {
    console.error(
        "Invalid client environment variables:",
        parsedClientEnv.error.flatten().fieldErrors,
    );

    throw new Error("Invalid client environment variables");
}

export const clientEnv = {
    app: {
        name: parsedClientEnv.data.NEXT_PUBLIC_APP_NAME,
        url: parsedClientEnv.data.NEXT_PUBLIC_APP_URL,
    },
} as const;