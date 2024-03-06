import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "database.db",
	define: {
		underscored: true
	},
	logging: false
});