import "dotenv/config";
import config from "./config";
import express from "express";
import cors from "cors";
import { createServer } from "https";
import { initModels } from "@/db/models";
import { sequelize } from "@/db";
import { apiRouter } from "@/api";
import { setupViewEngine } from "@/util/viewengine";

import "@/strategies";

(async () => {
	initModels(sequelize);
	await sequelize.sync();

	const app = express();

	app.use(cors({
		origin: `https://localhost:${config.PORT}`,
	}));

	app.use(express.json());
	app.use("/api", apiRouter);
	setupViewEngine(app);

	const httpsServer = createServer(config.CREDENTIALS, app).listen(config.PORT);
	
	httpsServer.on("listening", () => {
		console.log("Server listening on port", config.PORT);
	});
})();