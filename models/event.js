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
                adress: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                startDate: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                endDate: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                zipCode: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                city: {
                    type: DataTypes.STRING,
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
