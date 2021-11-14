import path from 'path';
import { Router, Response } from "express";
import { readFile } from "fs";

export const LogsRouter = Router();

LogsRouter.get('/', async (req, res: Response) => {
    readFile(path.resolve(__dirname,'../logs.txt'),(err,data) => {
        if(err){
            res.sendStatus(500);
        }else{
            const logArray = data.toString().split('\n').filter(Boolean);
            const parsedLogs = logArray.map((log)=>{
               const [date, time, type, ...desc] = log.split(' ');

               return {
                date: `${date} ${time}`,
                type,
                description: (desc).join(' '),
               };
            });

            res.json(parsedLogs).status(200);
        }
    })
});