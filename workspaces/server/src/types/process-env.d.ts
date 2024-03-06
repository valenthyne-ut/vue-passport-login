export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;
			PORT: string;
			BCRYPT_HASH_COST: string;
			BCRYPT_ACCEPTABLE_HASH_DELAY: string;
		}
	}
}