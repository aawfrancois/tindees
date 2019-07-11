import Event from '../models/event'
import Sequelize, {Op} from "sequelize";
import dotenv from 'dotenv'


dotenv.config()
const moment = require('moment')
moment().format();


export const db = new Sequelize(process.env.DATABASE_URL, {
    operatorsAliases: Op,
    define: {
        underscored: true,
    },
})


Event.init(db, Sequelize);


export async function changeStatus() {
    //partie 10 min
    try {
        let event = await Event.findAll();

        let CurrentDate = moment().format('YYYY-MM-DD hh:mm');

        event.forEach((element) => {
            console.log(element.dataValues.endDate);
            console.log(CurrentDate >= element.dataValues.endDate) ;
            console.log(CurrentDate);
            if (CurrentDate >= element.dataValues.endDate) {
                Event.sequelize.query(`UPDATE event SET status = false WHERE id = ${element.dataValues.id}`)
            }
        })
    } catch (e) {
        console.log(e.message)
    }
}

changeStatus()
