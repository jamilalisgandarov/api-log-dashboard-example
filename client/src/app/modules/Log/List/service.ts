import { HttpClient } from './../../HttpClient';
import { ILog } from './models';

class LogService extends HttpClient {
    constructor(){
        super({
            baseURL: 'http://localhost:8000/logs'
        });
    }

    getLogs(){ 
        return this.getRequest<{list:ILog[]}>({
            url: '/'
        });
    }

    shouldFetchLogs(){
        return this.getRequest<{hasChanged:boolean}>({ url:'/hasChanged' });
    }
}

export const logService = new LogService();