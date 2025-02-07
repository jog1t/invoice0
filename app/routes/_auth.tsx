import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
	beforeLoad: ({ context }) => {
		console.log(context);
		if (!context.session) {
			throw redirect({ to: "/" });
		}
	},
});
