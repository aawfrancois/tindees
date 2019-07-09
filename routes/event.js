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

        const idEventList = userevent.map((element) => element.event_id)

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
        let userevent = await UserEvent.findAll({where: {user_uuid: request.params.uuid}})
        let category = await Category.findAll();
        let event = await Event.findAll();



        const dataVal = userevent.map(e => {
            const indexEvent = event.findIndex(x =>x.id === e.event_id)
            let {zip_code , startDate, endDate, id_user, name, description, id, adress, id_category, city} = event[indexEvent]
            const indexCat = category.findIndex(x =>x.id === id_category)
            return { zip_code , startDate, endDate, id_user, name, description, id, adress, city, category:category[indexCat].libelle}
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

api.post('/myevent', async (req, res) => {

    let {event_id, uuid} = req.body

    try {
        let userevent = new UserEvent();
        userevent.user_uuid = uuid;
        userevent.event_id = event_id;
        console.log(userevent)
        let data = await userevent.save()

        console.log(`Event save`);
        res.json({data: data})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

api.delete('/myevent', async (req, res) => {

    let {event_id, uuid} = req.body

    try {
        let userevent = await UserEvent.destroy({
            where: {
            user_uuid: uuid,
            event_id: event_id
        }});
        console.log(`Deleted particpation: ${userevent} `);
        res.status(200).json({succes: `${userevent} deleted`});
    } catch (e) {
        res.status(400);
    }
})


api.post('/', async (req, res) => {

    let {name, description, startDate, endDate, id_category, zip_code, city, address, uuid} = req.body

    try {
        let event = new Event({ name, description, id_category, startDate, endDate, zip_code, city, address, uuid });
        event.status = true;
        event.user_uuid = uuid;
        let data = await event.save()

        console.log(`Event save`);
        res.json({data: data})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

export default api
