/* switch支持除boolean型以外的数据类型，并返回传入组件的数据类型 */

/**
 * @return :
 *  type :
 *      string '0'——false,'1'——true
 *      number 0-false,1——true
 * */
import React from 'react'
import { Switch } from 'antd'

function SwitchComponent(props){
	let checkedType=typeof props.checked;
	let defaultChecked=props.checked;
	if(checkedType==='object'){
		throw new Error('switch数据类型只能为布尔、字符串、数值中的一种，请检查数据类型！');
	}
	if(checkedType==='string'){
		if(isNaN(Number(defaultChecked))){
			throw new Error('switch数据错误，仅支持0或1的字符串，请检查数据！');
		}
		defaultChecked=!!Number(defaultChecked);
	}
	if(checkedType==='number')defaultChecked=!!defaultChecked;

	return (
		<Switch defaultChecked={defaultChecked} checkedChildren='启用' unCheckedChildren='停用' />
	);
}

export default SwitchComponent;