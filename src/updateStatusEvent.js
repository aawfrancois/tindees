import Event from '../models/event'
import dotenv from 'dotenv'
import Sequelize, {Op} from "sequelize";
import User from "../models/user";
import Category from "../models/category";
import UserEvent from "../models/userevent";


dotenv.config()
const moment = require('moment')
moment().format();

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



export async function changeStatus() {
    //partie 10 min
    try {
        let event = await Event.findAll();

        let CurrentDate = moment().format('YYYY-MM-DD hh:mm');

        event.forEach((element) => {
            if (CurrentDate >= element.dataValues.endDate) {
                Event.sequelize.query(`UPDATE event SET status = false WHERE id = ${element.dataValues.id}`)
            }
        })
    } catch (e) {
        console.log(e.message)
    }
}

changeStatus()
