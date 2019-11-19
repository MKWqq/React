import fetch from "isomorphic-fetch";
import Cookies from 'js-cookie';
import {ValidateApi,} from "./api-test";
export const HOST_API = process.env.NODE_ENV === 'production' ? "./" : "api/";

function genertor(response,url) {
  return response
  .then(res => {
    if ((res.status >= 200 && res.status < 300) || res.status === 400) {
      return res.json ? res.json() : res.bob();
    } else {
      return { ecode: 1, data: {}, message: "数据异常" };
    }
  })
  .then(res => {
    if (process.env.NODE_ENV !== 'production') {
      ValidateApi(url,res.data);
    }
    if (res.ecode === 4) {
      Cookies.remove("gdmsToken");
      location.href = "./#/auth";
      return res;
    }
    return res;
  })
  .catch(err => {
    return { ecode: 1, data: {}, message: "数据异常" };
  });
}

export async function get(url, option = {}) {
  return genertor(
    fetch(
      HOST_API + url,
      Object.assign(option, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
          "token": Cookies.get("gdmsToken"),
        }
      })
    ),
    url,
  );
}

export async function post(url, option = {}) {
  return genertor(
    fetch(HOST_API + url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        "token": Cookies.get("gdmsToken"),
      },
      body: JSON.stringify(option)
    }),
    url,
  );
}
