import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getWebRequest } from "@tanstack/start/server";
import { auth } from "~/lib/auth";
import { authClient } from "~/lib/auth-client";

const logout = createServerFn({ method: "POST" }).handler(async () => {
	await auth.api.signOut({ headers: getWebRequest()!.headers });
});

export const Route = createFileRoute("/_auth/hello")({
	component: RouteComponent,
	loader: ({ context }) => {
		return { user: context.user };
	},
});

function RouteComponent() {
	const router = useRouter();

	const orgs = authClient.useListOrganizations();

	console.log(orgs);

	return (
		<div>
			Hello "/_auth/hello"!
			{JSON.stringify(Route.useLoaderData().user, null, 2)}
			<button
				type="button"
				onClick={() => {
					logout().then(() => {
						router.invalidate();
					});
				}}
			>
				logout
			</button>
		</div>
	);
}
