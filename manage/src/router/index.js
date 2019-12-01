/**
 * 路由
 * */
import React,{Component} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

// 组件
import App from '../pages/App'
import Login from '../pages/login/Login'
import Main from '../pages/main'
import NoMatch from 'pages/404'
import MainRoute from './MainRoute'

export default class IRouter extends Component{

	render(){
		return (
			<Router>
				<App>
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/main">
							<Main>
                                <MainRoute />
							</Main>
						</Route>
						<Route>
                            <NoMatch />
						</Route>
					</Switch>
				</App>
			</Router>
		)
	}
}