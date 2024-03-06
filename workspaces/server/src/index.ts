import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "https";
import config from "./config";

(async () => {
	const app = express();
	
	app.use(cors({
		origin: `https://localhost:${config.PORT}`
	}));

	const httpsServer = createServer(config.CREDENTIALS, app).listen(config.PORT);
	
	httpsServer.on("listening", () => {
		console.log("Server listening on port", config.PORT);
	});
})();