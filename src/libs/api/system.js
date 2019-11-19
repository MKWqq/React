import { post } from "./index"
import md5 from "md5"
const user = "business/user/";

export function loginAPI (obj) {
    return post(`${user}login`, JSON.stringify({
        account: obj.account,
        password: md5(md5(obj.password))
    }))
}

export function loginOut (obj) {
    return post(`${user}logout`, JSON.stringify(obj))
}
