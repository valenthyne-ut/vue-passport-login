import { benchmarkServerHashCost } from "@/util/bcrypt";
import { randomBytes } from "crypto";
import { readFileSync } from "fs";
import { ServerOptions } from "https";
import { join } from "path";

function readCredentials(): ServerOptions {
	const credentials: ServerOptions = {};
	
	try {
		const cwd = process.cwd();
		const credentialsPath = join(cwd, "/credentials");
		const keyPath = join(credentialsPath, "/key.pem");
		const certificatePath = join(credentialsPath, "/cert.pem");

		credentials.key = readFileSync(keyPath, { encoding: "utf-8" });
		credentials.cert = readFileSync(certificatePath, { encoding: "utf-8" });
	} catch(error) {
		console.log("Couldn't load SSL credentials.\n", error);
		process.exit(1);
	}

	return credentials;
}

function getHashCost() {
	const userDefHashCost = parseInt(process.env.BCRYPT_HASH_COST);
	if(userDefHashCost) { return userDefHashCost; }
	
	const userDefAcceptableDelay = parseInt(process.env.BCRYPT_ACCEPTABLE_HASH_DELAY);
	if(userDefAcceptableDelay) { return benchmarkServerHashCost(userDefAcceptableDelay); }
	
	return benchmarkServerHashCost(350);
}

export default {
	PORT: parseInt(process.env.PORT) || 8443,
	CREDENTIALS: readCredentials(),
	BCRYPT_HASH_COST: getHashCost(),
	BCRYPT_ACCEPTABLE_HASH_DELAY: parseInt(process.env.BCRYPT_ACCEPTABLE_HASH_DELAY) || 350,
	JWT_SECRET: randomBytes(48).toString("hex")
};