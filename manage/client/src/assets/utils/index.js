/**
 * description：对外暴露调用接口
 * date：2020-01-19
 * author：summerW
 * */
import UtilBase from './libs/utils'

class Utils extends UtilBase{
	constructor(props){
		super();
	}
    /* todo 判断数据类型 */
	isArray(value){
		return this.isType('Array')(value);
	}
	isObject(value){
		return this.isType('Object')(value);
	}
	isFunction(value){
		return this.isType('Function')(value);
	}
	isDate(value){
		return this.isType('Date')(value);
	}
	isRegExp(value){
		return this.isType('RegExp')(value);
	}
}

export default new Utils();