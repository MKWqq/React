/**
 * description:virtual dom还原
 * date:2020-02-27
 * */
import React,{Component} from 'react';
import {diff} from './diffList'
import createVirtualDOM from './VirtualDOM';
let liArr=['面包','辣子鸡','冷吃兔','关东煮'];
let childrenVNode=liArr.map((liText,idx)=>{
	return createVirtualDOM('li',{attrs:{class:`li${idx}`}},liText)
});
let ulVNode=createVirtualDOM('ul',{attrs:{id:'test'}},childrenVNode);
console.log(ulVNode.render());

/* todo diff */
let oldArr=[{name:1},{name:2},{name:3}];
let newArr=[{name:3},{name:3}];
console.log(diff(oldArr,newArr,'name'));
export default function ActualDOM(props){
	let state={
		dom:ulVNode.render().toString()
	};
	return (
		<div>
			{state.dom}
		</div>
	);
}