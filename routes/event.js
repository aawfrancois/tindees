import {Router} from 'express';
import Event from '../models/event';
import UserEvent from '../models/userevent'
import Category from '../models/category'

import dotenv from 'dotenv';

dotenv.config();

let api = Router();

api.get("/:uuid", async (request, response) => {

    try {

        let userevent = await UserEvent.findAll({where: {user_uuid:  request.params.uuid}})

        const idEventList = userevent.map((element) => element.EventId)

        let event = await Event.findAll({where: {status: true}})
        let category = await Category.findAll();

        let result = event.filter(e => !idEventList.includes(e.id));

        const dataVal = result.map(e => {
                const indexCat = category.findIndex(x =>x.id === e.id_category)

           return {...e.dataValues, category:category[indexCat].libelle}
        })
        if (dataVal) {
            response.status(200).json({ data: dataVal });
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
        let event = await UserEvent.findAll({where: {id: request.params.uuid}})
        if (event) {
            response.status(200).json({ data: event });
        } else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(400).json({
            err: error.message
        });
    }
});

api.post('/myevent', async (req, res) => {

    let {event_id, uuid} = req.body

    try {
        let userevent = new UserEvent({});
        userevent.user_uuid = uuid;
        userevent.event_id = event_id;
        let data = await userevent.save()

        console.log(`Event save`);
        res.json({data: data})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})


api.post('/', async (req, res) => {

    let {name, description, startDate, endDate, id_category, zipCode, city, adress, uuid} = req.body

    try {
        let event = new Event({ name, description, id_category, startDate, endDate, zipCode, city, adress, uuid });
        event.status = true;
        event.id_user = uuid;
        let data = await event.save()

        console.log(`Event save`);
        res.json({data: data})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

export default api
