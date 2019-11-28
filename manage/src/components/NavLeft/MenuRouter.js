/**
 * 菜单router
 * */
import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import MainPage from 'pages/MainPage'
import BaseSetting from 'pages/systemSetting/BaseSetting'
import StoreManage from 'pages/systemSetting/StoreManage'
import NavLeft from './MenuLink'

export default function MenuRouter() {
	return (
		<Router>
			<NavLeft>
				<Switch>
					<Route path="/MainPage" component={MainPage} />
					<Route path="/StoreManage" component={StoreManage} />
					<Route path="/setting">
						<BaseSetting>
							<Route path="/setting/store" component={StoreManage} />
						</BaseSetting>
					</Route>
				</Switch>
			</NavLeft>
		</Router>
	)
};