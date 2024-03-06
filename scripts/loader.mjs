import { isAbsolute, join } from "path";

// #region Args preparation

const args = process.argv.slice(2);

/**
 * @param {string} path 
 * @returns {string}
 */
function prepareArgvPath(path) {
	return isAbsolute(path) ? path : join(process.cwd(), path);
}

const clientDirectoryArg = args.find(value => value.startsWith("--client-directory="));
if(typeof clientDirectoryArg === "undefined") {
	throw "LOADER: --client-directory argument not set.";
}

const serverDirectoryArg = args.find(value => value.startsWith("--server-directory="));
if(typeof serverDirectoryArg === "undefined") {
	throw "LOADER: --server-directory argument not set.";
}

const buildDirectoryArg = args.find(value => value.startsWith("--build-directory="));

// #endregion

// #region Constants

const CLIENT_ROOT_DIR 			= clientDirectoryArg.split("=")[1];
const CLIENT_DIST_DIR 			= join(CLIENT_ROOT_DIR, "/dist");

const SERVER_ROOT_DIR 			= serverDirectoryArg.split("=")[1];
const SERVER_DIST_DIR 			= join(SERVER_ROOT_DIR, "/dist");
const SERVER_CREDENTIALS_DIR 	= join(SERVER_ROOT_DIR, "/credentials");
const SERVER_ENV_FILE 			= join(SERVER_ROOT_DIR, "/.env");
const SERVER_PACKAGE_FILE 		= join(SERVER_ROOT_DIR, "/package.json");

const BUILD_ROOT_DIR 			= typeof buildDirectoryArg !== "undefined" ? buildDirectoryArg.split("=")[1] : prepareArgvPath("build");
const BUILD_CREDENTIALS_DIR 	= join(BUILD_ROOT_DIR, "/credentials");
const BUILD_HTDOCS_DIR 			= join(BUILD_ROOT_DIR, "/htdocs");
const BUILD_YARNLOCK_FILE		= join(BUILD_ROOT_DIR, "/yarn.lock");
const BUILD_YARNRC_FILE 		= join(BUILD_ROOT_DIR, "/.yarnrc.yml");
const BUILD_ENV_FILE 			= join(BUILD_ROOT_DIR, "/.env");
const BUILD_PACKAGE_FILE 		= join(BUILD_ROOT_DIR, "/package.json");

// #endregion

export {
	CLIENT_ROOT_DIR,
	CLIENT_DIST_DIR,

	SERVER_ROOT_DIR,
	SERVER_DIST_DIR,
	SERVER_CREDENTIALS_DIR,
	SERVER_ENV_FILE,
	SERVER_PACKAGE_FILE,

	BUILD_ROOT_DIR,
	BUILD_CREDENTIALS_DIR,
	BUILD_HTDOCS_DIR,
	BUILD_YARNLOCK_FILE,
	BUILD_YARNRC_FILE,
	BUILD_ENV_FILE,
	BUILD_PACKAGE_FILE
};