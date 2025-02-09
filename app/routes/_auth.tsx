import { Zero } from "@rocicorp/zero";
import { ZeroProvider } from "@rocicorp/zero/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { schema } from "~/lib/zero";
import { useState } from "react";

export const Route = createFileRoute("/_auth")({
	beforeLoad: ({ context }) => {
		if (!context.session) {
			throw redirect({ to: "/" });
		}
	},
	loader: ({ context }) => {
		return { user: context.user! };
	},
	component: () => {
		const { user } = Route.useLoaderData();

		const [z] = useState(() =>
			typeof window !== "undefined"
				? new Zero({
						logLevel: "info",
						server: import.meta.env.VITE_PUBLIC_ZERO_SERVER as string,
						userID: user.id,
						schema,
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
