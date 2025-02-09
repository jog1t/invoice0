import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { jwt, organization } from "better-auth/plugins";

export const auth = betterAuth({
	baseURL: process.env.VITE_BASE_URL,
	database: drizzleAdapter(db, {
		provider: "pg",
	}),

	plugins: [jwt(), organization()],

	// services
	emailAndPassword: {
		enabled: true,
	},
});
