import {
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { organization } from "./auth.schema";

export const invoiceStatus = pgEnum("status", [
	"draft",
	"sent",
	"paid",
	"canceled",
]);

export const invoice = pgTable("invoice", {
	id: text("id").primaryKey(),
	key: text("key").notNull().unique(),
	orgId: text("org_id")
		.notNull()
		.references(() => organization.id),
	status: invoiceStatus().notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export const invoiceItem = pgTable("invoice_item", {
	id: text("id").primaryKey(),
	invoiceId: text("invoice_id")
		.notNull()
		.references(() => invoice.id),
	description: text("description").notNull(),
	quantity: integer("quantity").notNull(),
	price: integer("price").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});
