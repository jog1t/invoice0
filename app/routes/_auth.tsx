import { Zero } from "@rocicorp/zero";
import { ZeroProvider } from "@rocicorp/zero/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { schema } from "~/lib/zero";
import { useState } from "react";
import { env } from "~/lib/env";
import { ls } from "~/lib/ls";
import { authClient } from "~/lib/auth-client";
import { auth } from "~/lib/auth";
import { getWebRequest } from "vinxi/http";
import { createServerFn } from "@tanstack/start";

export const getToken = createServerFn({ method: "GET" }).handler(async () => {
	return auth.api.getToken({ headers: getWebRequest()!.headers });
});

export const Route = createFileRoute("/_auth")({
	beforeLoad: ({ context }) => {
		if (!context.session) {
			throw redirect({ to: "/" });
		}
	},
	loader: async ({ context }) => {
		return { user: context.user! };
	},
	component: () => {
		const { user } = Route.useLoaderData();

		const [z] = useState(() =>
			typeof window !== "undefined"
				? new Zero({
						logLevel: "info",
						server: env.VITE_PUBLIC_ZERO_SERVER,
						userID: user.id,
						schema,
						auth: async () => {
							return (await getToken()).token;
						},
						kvStore: "mem",
					})
				: null,
		);
		return (
			<ZeroProvider zero={z}>
				<Outlet />
			</ZeroProvider>
		);
	},
});
