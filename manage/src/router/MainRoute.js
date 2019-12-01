/**
 * main相关路由匹配
 * */
import React from 'react'
import {Switch,Route} from 'react-router-dom'
import MainPage from 'pages/main/MainPage'
import BaseSetting from 'pages/main/systemSetting/BaseSetting'
import StoreManage from 'pages/main/systemSetting/StoreManage'
import ChildStore from 'pages/main/systemSetting/ChildStore'
import NoMatch from 'pages/404'

export default function MainRoute(){
    return (
        <Switch>
            <Route path="/main/MainPage" component={MainPage} />
            <Route path="/main/StoreManage" component={StoreManage} />
            <Route path="/main/setting">
                <BaseSetting>
                    <Route path="/main/setting/:id" component={ChildStore} />
                </BaseSetting>
            </Route>
            <Route>
                <NoMatch />
            </Route>
        </Switch>
    )
}