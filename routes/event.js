import {Router} from 'express';
import Event from '../models/event';
import Category from '../models/category'
import UserEvent from '../models/userevent'
import _ from "lodash";

import dotenv from 'dotenv';

dotenv.config();

let api = Router();

api.get("/", async (request, response) => {
    try {
        let event = await Event.findAll()
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


api.get("/:uuid", async (request, response) => {
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
        event.id_user = uuid
        let data = await event.save()

        console.log(`Event save`);
        res.json({data: data})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

export default api
