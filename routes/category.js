import {Router} from 'express';
import Category from '../models/category';
import _ from "lodash";

import dotenv from 'dotenv';

dotenv.config();

let api = Router();

api.get("/", async (request, response) => {
    try {
        let category = await Category.findAll()
        if (category) {
            response.status(200).json({
                data: {
                    category,
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

export default api
