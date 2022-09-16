import { message } from "antd";
const baseUrl = "http://xawn.f3322.net:8012"

export default function request(url, options = {}) {
    if (options.body) {
        let body = options.body || {};
        let s = ""
        Object.keys(body).forEach(key => {
            if (body[key] === undefined || body[key] === "") return;
            s += `${key}=${body[key]}&`
        })
        /**
         * const body  = {
                usernarm:'admin',
                password:'123'}
            s = "username=admin&password=123"
         */
        options.body = s;
    }
    if (options.query) {
        const query = options.query || {};
        let s = ""
        Object.keys(query).forEach(key => {
            if (query[key] === undefined || query[key] === "") return;
            s += `${key}=${query[key]}&`
        })
        url = `${url}?${s}`;
    }
    options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authentication": localStorage.getItem('token'),
    }
    return fetch(baseUrl + url, options)
        .then(response => {
            switch (response.status) {
                case 200:

                    return response.json();
                case 401:
                    localStorage.clear();
                    // window.location.pathname = "/login";
                    // window.localStorage.hash = "#/login";
                    break;
                default:
                    return response.json()
            }
        })
        .catch(err => {
            console.log('接口错误： ', err);
            console.dir(err)
            const msg = "Unexpected end of JSON input";
            if (err.message && err.message === msg) {//针对后端接口状态码200，但是没有任何内容返回的时候
                return Promise.resolve();
            }
            return Promise.reject(err);
        })
}


