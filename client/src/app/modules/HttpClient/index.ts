import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface IHttpRequestArgs<T = {}> {
    url: string;
    data?: T;
    headers?: any;
}

// This class is created to have centralized logic for services
// which makes it easy to modify, refactor or intercept 
// api calls
export class HttpClient {
    private api: AxiosInstance;
    private BASE_URL = '/';

    constructor({ baseURL, url }: AxiosRequestConfig) {
        this.api = axios.create({ baseURL, url });

        this.api.interceptors.response.use(
            res => Promise.resolve(res.data),
            err => {
                console.log(err);

                return Promise.reject(err.response);
            }
        );
        this.BASE_URL = url || '';
    }

    protected getRequest = <Res>({ url, headers}: IHttpRequestArgs) => {
        return this.api.get<Res, Res>(`${this.BASE_URL}${url}`, { headers });
    };

    protected postRequest = <Req, Res>({
        url,
        headers,
        data
    }: IHttpRequestArgs<Req>) => {
        return this.api.post<Req, Res>(url, data, { headers });
    };

    protected putRequest = <Req, Res>({
        url,
        headers,
        data
    }: IHttpRequestArgs<Req>) => {
        return this.api.put<Req, Res>(url, data, { headers });
    };

    protected deleteRequest = <Res>({ url, headers }: IHttpRequestArgs) => {
        return this.api.delete<Res>(url, { headers });
    };
}
