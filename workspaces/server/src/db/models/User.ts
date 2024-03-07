import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: CreationOptional<number>;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare username: string;
	declare password: string;

	static initModel(sequelize: Sequelize): typeof User {
		return User.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			createdAt: {
				type: DataTypes.DATE
			},
			updatedAt: {
				type: DataTypes.DATE
			},

			username: {
				type: DataTypes.TEXT,
				unique: true,
				allowNull: false
			},
			password: {
				type: DataTypes.TEXT,
				allowNull: false
			}
		}, { sequelize });
	}
}