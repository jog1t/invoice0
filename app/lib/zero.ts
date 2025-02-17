import { createZeroSchema } from "drizzle-zero";
import * as dbSchema from "./db/schema";
import {
	ANYONE_CAN,
	definePermissions,
	type ExpressionBuilder,
	NOBODY_CAN,
	type Row,
} from "@rocicorp/zero";

// Convert to Zero schema
export const schema = createZeroSchema(dbSchema, {
	version: 1,

	tables: {
		user: {
			id: true,
			name: true,
			email: true,
			image: true,
			email_verified: false,
			created_at: true,
			updated_at: true,
		},
		session: {
			id: true,
			expires_at: true,
			token: true,
			created_at: true,
			updated_at: true,
			ip_address: true,
			user_agent: true,
			user_id: true,
			active_organization_id: true,
		},
		account: {
			id: true,
			account_id: true,
			provider_id: true,
			user_id: true,
			access_token: true,
			refresh_token: true,
			id_token: true,
			access_token_expires_at: true,
			refresh_token_expires_at: true,
			scope: true,
			password: true,
			created_at: true,
			updated_at: true,
		},
		verification: {
			id: true,
			identifier: true,
			value: true,
			expires_at: true,
			created_at: true,
			updated_at: true,
		},
		jwks: {
			id: true,
			public_key: true,
			private_key: true,
			created_at: true,
		},
		member: {
			id: true,
			user_id: true,
			organization_id: true,
			role: true,
			created_at: true,
		},
		organization: {
			id: true,
			name: true,
			created_at: true,
			slug: true,
			logo: true,
			metadata: true,
		},
		invitation: {
			id: true,
			organization_id: true,
			role: true,
			email: true,
			expires_at: true,
			status: true,
			inviter_id: true,
		},
		invoice: {
			id: true,
			key: true,
			org_id: true,
			status: true,
			created_at: true,
			updated_at: true,
		},
		invoice_item: {
			id: true,
			invoice_id: true,
			description: true,
			quantity: true,
			price: true,
			created_at: true,
			updated_at: true,
		},
	},

	manyToMany: {},
});

export type Schema = typeof schema;
type User = Row<typeof schema.tables.user>;
type AuthData = { sub: string };

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
	const allowIfUserIsSelf = (
		authData: AuthData,
		{ cmp }: ExpressionBuilder<Schema, "user">,
	) => cmp("id", "=", authData.sub);

	return {
		user: {
			row: {
				insert: ANYONE_CAN,
				delete: NOBODY_CAN,
			},
		},
		organization: {
			row: {
				select: NOBODY_CAN,
			},
		},
	};
});
