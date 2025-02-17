import { relations, sql } from "drizzle-orm";
import { member, organization, user } from "./auth.schema";
import { invoice } from "./invoice.schema";
import { pgPolicy } from "drizzle-orm/pg-core";

// export const organizationRelations = relations(organization, ({ many }) => ({
// 	users: many(user),
// 	invoices: many(invoice),
// }));
// export const userRelations = relations(user, ({ one, many }) => ({
// 	organizations: many(organization),
// }));

export const userRelations = relations(user, ({ many }) => ({
	members: many(member),
}));

export const organizationRelations = relations(organization, ({ many }) => ({
	members: many(member),
}));

export const memberRelations = relations(member, ({ one }) => ({
	users: one(user, {
		fields: [member.userId],
		references: [user.id],
	}),
	organizations: one(organization, {
		fields: [member.organizationId],
		references: [organization.id],
	}),
}));
