import Sequelize, { Op } from 'sequelize'
import User from './user'
import Event from './event'
import Category from './category'
import UserEvent from './userevent'
import dotenv from 'dotenv'
dotenv.config()

export const db = new Sequelize(process.env.DATABASE_URL, {
    operatorsAliases: Op,
    define: {
        underscored: true,
    },
})

User.init(db, Sequelize);
Event.init(db, Sequelize);
Category.init(db, Sequelize);
UserEvent.init(db, Sequelize);


User.belongsToMany(Event, { through: UserEvent, foreignKey: 'user_uuid'});
Event.belongsToMany(User, { through: UserEvent, foreignKey: 'event_id'});

User.hasOne(Event, {foreignKey: 'user_uuid'});
Category.hasOne(Event, {foreignKey: 'id_category'});
