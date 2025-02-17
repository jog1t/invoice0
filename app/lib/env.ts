import { z } from "zod";

const clientEnvVariables = z.object({
	VITE_PUBLIC_ZERO_SERVER: z.string(),
	VITE_BASE_URL: z.string(),
});

const serverEnvVariables = z.object({
	NODE_ENV: z.string(),
	DATABASE_URL: z.string(),
	ZERO_UPSTREAM_DB: z.string(),
	ZERO_CVR_DB: z.string(),
	ZERO_CHANGE_DB: z.string(),
	ZERO_AUTH_SECRET: z.string(),
	ZERO_REPLICA_FILE: z.string(),
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.string(),
	EMAIL_SERVER_USER: z.string().default(""),
	EMAIL_SERVER_PASSWORD: z.string().default(""),
	EMAIL_SERVER_HOST: z.string(),
	EMAIL_SERVER_PORT: z.coerce.number(),
	EMAIL_FROM: z.string(),
});

const envVariables = clientEnvVariables.merge(serverEnvVariables);

export const env = (
	typeof window === "undefined"
		? envVariables.parse(process.env)
		: clientEnvVariables.parse(import.meta.env)
) as z.infer<typeof envVariables>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariables> {}
	}
}
