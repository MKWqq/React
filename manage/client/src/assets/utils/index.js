/**
 * description：对外暴露调用接口
 * date：2020-01-19
 * author：summerW
 * */
import basicUtils from './libs/utils'

export default{
	/* todo 判断数据类型 */
	isArray:basicUtils.isType('Array'),
	isObject:basicUtils.isType('Object'),
	isFunction:basicUtils.isType('Function'),
	isDate:basicUtils.isType('Date'),
	isRegExp:basicUtils.isType('RegExp'),
}