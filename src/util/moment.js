/**
 * Author: mingsong
 * Date: 2018/3/8/008
 * Desc: 时间格式化工具类
 */
import moment from "moment";

/**
 * 时间格式化
 * @param time 时间戳
 * @returns {string} 返回格式化后的时间
 */
export function momentUtil(time) {
  return time ? moment(time).format("YYYY-MM-DD HH:mm:ss") : "";
}
