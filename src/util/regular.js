export let loginAccount = /^[a-zA-Z0-9]+$/; //登录名
export let loginImgCode = /^\d{4}$/; // 图片验证码
export let common = /^[a-zA-Z0-9]+$/; // 只支持字母数字字符
export let allNumber = /^\d+([.]{1}[0-9]{1,2}?)$/; // 全局数量小数点后二位
export let phoneNumber = /^1\d{10}/; // 电话号码
export let telPhone = /^(\d{3,4}-)?(\d{6,8})$/; // 座机
export let chinese = /^[\u4E00-\u9FFF]{2,6}$/; // 中文姓名
export let blank = /^(?!(\s+$))/;// 不能全部为空格
export let bankNumber = /^([1-9]{1})(\d{14}|\d{18})$/; // 银行卡号
export let email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/; // 邮箱验证
export let IDNumber = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/; // 身份证号码校验

global.RegCommon = common;
global.RegTelPhone = telPhone;
global.RegAllNumber = allNumber;
global.RegPhoneNumber = phoneNumber;
global.RegChinese = chinese;
global.RegBankNumber = bankNumber;
global.RegEmail = email;
global.RegIDNumber = IDNumber;

export default {
  common,
};
