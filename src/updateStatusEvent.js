import Event from '../models/event'
import dotenv from 'dotenv'


dotenv.config()
const moment = require('moment')
moment().format();



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
