import { Outlet, createRootRoute } from "@tanstack/react-router";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import { getWebRequest } from "@tanstack/start/server";
import type { ReactNode } from "react";
import { auth } from "~/lib/auth";

const fetchAuth = createServerFn({ method: "GET" }).handler(async () => {
	const { headers } = getWebRequest()!;
	const session = await auth.api.getSession({ headers });

	return session;
});

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
	}),
	beforeLoad: async () => {
		const session = await fetchAuth();
		return {
			...session,
		};
	},
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<Meta />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
