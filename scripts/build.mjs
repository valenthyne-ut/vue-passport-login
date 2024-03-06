// THIS SCRIPT SHOULD BE RUN USING YARN

import * as paths from "./loader.mjs";
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "fs";
import { $ as _ } from "execa";

(async () => {
	if(!existsSync(paths.SERVER_CREDENTIALS_DIR)) {
		console.log("SSL credentials not found in server folder. Please provide SSL credentials before proceeding.");
		process.exit(1);
	}

	try {
		const $ = _({ stdio: "inherit" });

		console.log("Building client and server.");
		await $`yarn workspaces foreach -Rpt --from {client,server} run build`;

		console.log("Packaging build.");
		if(existsSync(paths.BUILD_ROOT_DIR)) { rmSync(paths.BUILD_ROOT_DIR, { recursive: true }); }

		cpSync(paths.SERVER_DIST_DIR, paths.BUILD_ROOT_DIR, { recursive: true });
		cpSync(paths.SERVER_CREDENTIALS_DIR, paths.BUILD_CREDENTIALS_DIR, { recursive: true });
		cpSync(paths.CLIENT_DIST_DIR, paths.BUILD_HTDOCS_DIR, { recursive: true });

		console.log("Installing build dependencies.");
		writeFileSync(paths.BUILD_YARNRC_FILE, "nodeLinker: node-modules", { encoding: "utf-8" });
		writeFileSync(paths.BUILD_YARNLOCK_FILE, "", { encoding: "utf-8" });
		
		const buildDependencies = JSON.parse(readFileSync(paths.SERVER_PACKAGE_FILE, { encoding: "utf-8" })).dependencies;
		writeFileSync(paths.BUILD_PACKAGE_FILE, JSON.stringify({ dependencies: buildDependencies }));

		await $`yarn --cwd ${paths.BUILD_ROOT_DIR} install`;
	} catch(error) {
		console.log(error);
		process.exit(1);
	}
})();