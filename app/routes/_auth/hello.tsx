import { useQuery } from "@rocicorp/zero/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getWebRequest } from "@tanstack/start/server";
import { auth } from "~/lib/auth";
import { authClient } from "~/lib/auth-client";
import { useZero } from "~/lib/zero-client";

const logout = createServerFn({ method: "POST" }).handler(async () => {
	await auth.api.signOut({ headers: getWebRequest()!.headers });
});

const listOrganizations = createServerFn({ method: "GET" }).handler(
	async () => {
		return auth.api.listOrganizations({ headers: getWebRequest()!.headers });
	},
);

export const Route = createFileRoute("/_auth/hello")({
	component: RouteComponent,
	loader: async ({ context }) => {
		return { user: context.user, orgs: await listOrganizations() };
	},
});

function RouteComponent() {
	const router = useRouter();

	const orgs = Route.useLoaderData();

	const z = useZero();
	const [test] = useQuery(
		z.query.user.related("members", (q) =>
			q.where("user_id", "=", z.userID).related("organizations"),
		),
	);

	// console.log(orgs);

	return (
		<div>
			Hello "/_auth/hello"!
			{JSON.stringify(Route.useLoaderData().user, null, 2)}
			{JSON.stringify(test, null, 2)}
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
			<button
				type="button"
				onClick={async () => {
					console.log(await authClient.getSession());
					await authClient.organization.create({
						name: "My Organization",
						slug: "my-org",
						logo: "https://example.com/logo.png",
					});
				}}
			>
				create org
			</button>
		</div>
	);
}
