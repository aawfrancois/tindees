import {Model} from 'sequelize'

export default class Event extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                address: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                startDate: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                endDate: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                zip_code: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                city: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                status: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false

                }
            },
            {
                sequelize,
                tableName: "event",
            },
        )
    }
}
