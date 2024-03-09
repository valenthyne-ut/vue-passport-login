import { Sequelize } from "sequelize";
import { User } from "./User";
import { InvalidatedJWT } from "./InvalidatedJWT";

export function initModels(sequelize: Sequelize) {
	User.initModel(sequelize);
	InvalidatedJWT.initModel(sequelize);
}