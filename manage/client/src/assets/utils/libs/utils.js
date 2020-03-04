/**
 * description：暴露出工具的基本方法
 * date：2020-02-19
 * author：summerW
 * */

// export default function UtilBase(){
//     /* todo 检测数据类型 */
// 	this.type=(value)=>{
//         return Object.prototype.toString.call(value).replace(/\[object\s|\]/g,'');
//     };
//     this.isType=(type)=>{
//         return (value)=>{
//     		return this.type(value).toUpperCase()===type.toUpperCase();
// 		};
// 	};
// 	/* todo 函数科里化 */
//     this.curry=(fn)=>{
//         if(!this.isType('Function')(fn)){
//             throw new Error('第一个参数必须传入函数');
//         }
//         return function curriedFunc(...args){
//             if(args.length<fn.length){
//                 return function curried(...arg){
//                     return curriedFunc.apply(null,args.concat(arg));
//                 };
//             }else{
//                 return fn.apply(null,args);
//             }
//         }
//     }
// }

export default class Utils {
	constructor(){}

    /* todo 检测数据类型 */
	type(value){
		return Object.prototype.toString.call(value).replace(/\[object\s|\]/g,'');
	}
	isType(type){
        return (value)=>{
            return this.type(value).toUpperCase()===type.toUpperCase();
        };
	}
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