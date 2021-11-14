import { HttpClient } from './../../HttpClient';
import { ILog } from './models';

class LogService extends HttpClient {
    constructor(){
        super({
            baseURL: 'http://localhost:8000'
        });
    }

    getLogs(){ 
        return this.getRequest<{data:ILog[]}>({
            url: '/logs'
        });
    }
}

export const logService = new LogService();