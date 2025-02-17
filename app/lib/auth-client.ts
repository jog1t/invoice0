import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ls } from "./ls";

export const authClient = createAuthClient({
	baseURL: process.env.VITE_BASE_URL,
	plugins: [organizationClient()],
	fetchOptions: {
		onSuccess: (ctx) => {
			console.log("????", ctx.response);
			const authToken = ctx.response.headers.get("set-auth-token");
			if (authToken) {
				ls.bearer.set(authToken);
			}
		},
	},
});
