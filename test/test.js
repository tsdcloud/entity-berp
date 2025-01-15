import http from 'k6/http';
import {check} from 'k6'


export const options = {
    vus: 100,
    iterations: 200
}
export default function (){
    const res = http.get("https://entity-user-api.vercel.app/api/banks");
    check(res, {"Result status": r => r.status === 200});
}
