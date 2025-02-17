export const ls = {
	get: (key: string) => {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	},
	set: (key: string, value: unknown) => {
		localStorage.setItem(key, JSON.stringify(value));
	},

	bearer: {
		get: () => {
			return ls.get("bearer_token");
		},
		set: (token: string) => {
			ls.set("bearer_token", token);
		},
	},
};
