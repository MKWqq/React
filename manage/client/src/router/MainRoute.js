/**
 * main相关路由匹配
 * */
import React from 'react'
import {Switch,Route} from 'react-router-dom'
import MainPage from 'pages/main/MainPage/MainPage'
import BaseSetting from 'pages/main/systemSetting/BaseSetting'
import StoreManage from 'pages/main/systemSetting/StoreManage'
import ChildStore from 'pages/main/systemSetting/ChildStore'
import StoreTemplate from 'pages/main/Store/StoreTemplate'
import FoodMenuManage from 'pages/main/systemSetting/FoodMenuManage'
import NoMatch from 'pages/404'

export default function MainRoute(){
    return (
        <Switch>
            <Route path="/main/MainPage" component={MainPage} />
            <Route path="/main/StoreManage" component={StoreManage} />
            <Route path="/main/BaseSetting">
                <BaseSetting>
                    <Route path="/main/BaseSetting/:id" component={ChildStore} />
                </BaseSetting>
            </Route>
            <Route path='/main/Store'>
                <StoreTemplate />
            </Route>
            <Route path="/main/FoodMenuManage">
                <FoodMenuManage />
            </Route>
            <Route>
                <NoMatch />
            </Route>
        </Switch>
    )
}