import {observable,action,runInAction,} from 'mobx';
import {get,} from "../libs/api";

const userInfo = sessionStorage.getItem("UserInfo");


class UserInfo {
  @observable UserInfo = userInfo ? JSON.parse(userInfo) : {};
  constructor() {
    this.UserInfo = userInfo ? JSON.parse(userInfo) : {};
  }
  @action delUserInfo = () => {
    this.UserInfo = {};
  };
  @action updateUserInfo = async () => {
    const {ecode,data,message,} = await get('user/userInfo');
    if (ecode) {
      console.error("获取用户信息失败:" + message);
    } else {
      runInAction(() => {
        sessionStorage.setItem("UserInfo", JSON.stringify(data));
        this.UserInfo = data;
      });
    }
  };
}

export default new UserInfo();
