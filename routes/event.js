import {Router} from 'express';
import Event from '../models/event';
import UserEvent from '../models/userevent'

import dotenv from 'dotenv';

dotenv.config();

let api = Router();

api.get("/:uuid", async (request, response) => {


    let {uuid} = request.params.uuid
    try {

        let userevent = await UserEvent.findAll({where: {user_uuid: uuid}})

        const idEventList = userevent.map((element) => element.EventId)

        let event = await Event.findAll({where: {status: true}})

        const result = event.filter(e => !idEventList.includes(e.id));

        if (result) {
            response.status(200).json({
                data: {
                    result,
                    meta: {},
                }
            });
        } else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(400).json({
            err: error.message
        });
    }
});


api.get("/myevent/:uuid", async (request, response) => {
    try {
        let event = await UserEvent.findAll({where: {id: req.params.uuid}})
        if (event) {
            response.status(200).json({
                data: {
                    event,
                    meta: {},
                }
            });
        } else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(400).json({
            err: error.message
        });
    }
});


api.post('/', async (req, res) => {

    let {name, description, startDate, endDate, id_category, zipCode, city, adress, uuid} = req.body

    try {
        let event = new Event({ name, description, id_category, startDate, endDate, zipCode, city, adress, uuid });
        event.status = 0;
        event.id_user = uuid;
        let data = await event.save()

        console.log(`Event save`);
        res.json({data: data})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

export default api
