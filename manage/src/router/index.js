/**
 * 路由
 * */
import React,{Component} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import App from '../pages/App'
import Login from '../pages/login/Login'

export default class IRouter extends Component{

	render(){
		return (
			<Router>
				<App>
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
					</Switch>
				</App>
			</Router>
		)
	}
}