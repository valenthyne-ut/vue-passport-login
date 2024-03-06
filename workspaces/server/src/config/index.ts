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

export default {
	PORT: parseInt(process.env.PORT) || 8443,
	CREDENTIALS: readCredentials(),
};