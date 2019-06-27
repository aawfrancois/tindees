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
                place: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                startDate: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                endDate: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                status: {
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
