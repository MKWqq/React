/**
 * 菜单router
 * */
import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import MainPage from 'pages/MainPage'
import BaseSetting from 'pages/systemSetting/BaseSetting'
import StoreManage from 'pages/systemSetting/StoreManage'
import ChildStore from 'pages/systemSetting/ChildStore'
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
							<Route path="/setting/:id" component={ChildStore} />
						</BaseSetting>
					</Route>
					<Route render={()=>{
						return (
							<div>no match</div>
						)
					}} />
				</Switch>
			</NavLeft>
		</Router>
	)
};