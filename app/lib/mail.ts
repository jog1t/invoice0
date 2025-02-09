import nodemailer from "nodemailer";
import { env } from "./env";

const isDev = env.NODE_ENV === "development";

export const mailer = nodemailer.createTransport({
	host: env.EMAIL_SERVER_HOST,
	secure: !isDev,
	port: env.EMAIL_SERVER_PORT,
	from: env.EMAIL_FROM,
	auth: {
		user: env.EMAIL_SERVER_USER,
		pass: env.EMAIL_SERVER_PASSWORD,
	},
	tls: {
		rejectUnauthorized: !isDev,
	},
});

try {
	await mailer.verify();
} catch (e) {
	console.error("Could not connect to email server", e);
	throw new Error("Could not connect to email server", { cause: e });
}
