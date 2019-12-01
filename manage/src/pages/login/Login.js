/**
 * 登录页面
 * */
import React,{Component} from 'react'
import {Link} from 'react-router-dom'

export default class Login extends Component{
	render(){
		return (
			<Link to="/main">登录</Link>
		)
	}
}