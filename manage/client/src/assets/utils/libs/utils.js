/**
 * description：暴露出工具的基本方法
 * date：2020-02-19
 * author：summerW
 * */

export default{
	/* todo 检测数据类型 */
	isType(type){
		return function checkedType(value){
			return Object.prototype.toString.call(value)===`[object ${type}]`;
		}
	},
	/* todo 函数科里化 */
	curry(fn){
		if(!this.isType('Function')(fn)){
			throw new Error('第一个参数必须传入函数');
		}
		return function curriedFunc(...args){
			if(args.length<fn.length){
				return function curried(...arg){
					return curriedFunc.apply(null,args.concat(arg));
				};
			}else{
				return fn.apply(null,args);
			}
		}
	}
}