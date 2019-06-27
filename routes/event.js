import {Router} from 'express';
import Event from '../models/event';
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

api.post('/', async (req, res) => {

    let {name, description, startDate, endDate, category, zipCode, city, adress} = req.body

    try {
        let event = new Event({ name, description, startDate, endDate, category, zipCode, city, adress });
        let data = await event.save()

        console.log(`Event save`);
        res.json({data: data})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

export default api
