import { Request, Response, response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string
}

export default class ConnectionsController {
    async index(req: Request, res: Response) {
        const totalConnections = await db('connections').count('* as total');

        const { total } = totalConnections[0];

        return res.json({
            total
        })

    }
    async create(req: Request, res: Response) {
        const { user_id } = req.body;
        try {
            await db('connections').insert({
                user_id,
            });

            return res.status(201).json('Match!')
        } catch (err) {
            return res.status(400).json({
                error: 'Not Match!'
            })
        }
    }
}