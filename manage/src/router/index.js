/**
 * 菜单router
 * */
import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import MainPage from 'pages/MainPage'
import StoreManage from 'pages/systemSetting/StoreManage'

export default function MenuRouter() {
	return (
		<Router>
			<Switch>
				<Route path="/MainPage" component={MainPage} />
				<Route path="/StoreManage" component={StoreManage} />
			</Switch>
		</Router>
	)
};