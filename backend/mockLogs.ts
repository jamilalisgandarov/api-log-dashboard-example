import faker from "faker";
import { readFile, writeFile,promises } from "fs";
import {format} from 'date-fns';
import path from "path";

const logCount = 100;

function addMockLogs() {
    const logs = [];
    const dateFrom = new Date();
    const dateTo = new Date();
    dateFrom.setFullYear(2021);
    dateFrom.setMonth(dateTo.getMonth() !== 0 ? dateTo.getMonth()-1 : 11);

    for(let i=0; i<logCount; i++) {
        logs.push({
            date: format(
                faker.date.between(dateFrom.toString(),dateTo.toString()),
                'yyyy-MM-dd HH:mm:ss.s'
            ),
            description: faker.lorem.sentence(),
            type: faker.random.arrayElement(["ERROR","INFO","WARNING"])
        });
    }
    const logsString = logs.reduce((acc, log)=>{
        acc += `${log.date} ${log.type} ${log.description} \n`;

        return acc;
    },'');

    writeFile(path.resolve(__dirname,'./logs.txt'),logsString,(err)=>{
        console.log(err);
    });
}

export async function addNewLog(){
    try {
        const data = await promises.readFile(path.resolve(__dirname,'./logs.txt'),"utf-8");

        if(data){
            try {
            const logArray = data.toString().split('\n').filter(Boolean);
            const newLog = {
                date: format(
                    new Date(),
                    'yyyy-MM-dd HH:mm:ss.s'
                ),
                description: faker.lorem.sentence(),
                type: faker.random.arrayElement(["ERROR","INFO","WARNING"])
            };
            logArray.push(`${newLog.date} ${newLog.type} ${newLog.description}`);

            return promises.writeFile(path.resolve(__dirname,'./logs.txt'),logArray.join('\n'));
            } catch (error) {
                throw Error("Couldn't write file");
            }
        }

    } catch (error) {
        throw Error("Couldn't read file");
    }
}

addMockLogs();