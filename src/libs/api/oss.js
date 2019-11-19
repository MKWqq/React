import { post} from "./index"
// const oss = process.env.PROD ? "http://123.56.45.15/facilitator/oss" : "http://192.168.0.99:10088/facilitator/oss";  //lx
const oss = "oss/"
export function getOss (type) {
  return post(`${oss}ossAuth/${type}`)
}

export function getScr (src) {
  return post(`${oss}getUrl`, src, "text")
}