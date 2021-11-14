import faker from "faker";
import { writeFile } from "fs";
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

addMockLogs();