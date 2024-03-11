import express, { Express } from "express";
import { join } from "path";
import { renderFile } from "pug";

export function setupViewEngine(app: Express) {
	const cwd = process.cwd();

	app.use("/assets", express.static(join(cwd, "htdocs/assets")));
	app.use("/favicon.ico", express.static(join(cwd, "htdocs/favicon.ico")));

	app.engine("html", renderFile);
	app.set("view engine", "html");
	app.set("views", join(cwd, "htdocs"));

	app
		.get("/", (request, response) => {
			response.render("index.html");
		})
		.get("*", (request, response) => {
			response.redirect("/");
		});
}