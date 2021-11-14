import path from 'path';
import { Router, Response } from "express";
import { readFile } from "fs";
import { addNewLog } from '../mockLogs';

export const LogsRouter = Router();
let hasChanged = false;

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
            }).sort(function(a,b){
                return new Date(b.date).getTime()-new Date(a.date).getTime();
            });

            res.send({list: parsedLogs}).status(200);

            setTimeout(() => {
                addNewLog().then(()=>{
                    hasChanged = true;
                });
            }, 6*1000);
        }
    })
});

LogsRouter.get('/hasChanged', async (req, res: Response) => {
    res.send({hasChanged});
    hasChanged = false;
});