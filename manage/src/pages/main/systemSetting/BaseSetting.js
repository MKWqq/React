/**
 * 系统设置的基础模块
 * */
import React from 'react'
import {Link} from 'react-router-dom'

export default class BaseSetting extends React.Component{

	render(){
		return (
			<div>
				<span>this is base system setting</span>
				<Link to="/main/setting/ChildStore">门店管理</Link>
				{this.props.children}
			</div>
		)
	}
}