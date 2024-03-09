import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class InvalidatedJWT extends Model<InferAttributes<InvalidatedJWT>, InferCreationAttributes<InvalidatedJWT>> {
	declare id: CreationOptional<number>;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare jwt: string;

	static initModel(sequelize: Sequelize): typeof InvalidatedJWT {
		return InvalidatedJWT.init({
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

			jwt: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false
			}
		}, { sequelize });
	}
}