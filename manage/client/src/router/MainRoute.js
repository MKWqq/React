/**
 * main相关路由匹配
 * */
import React from 'react'
import {Switch,Route} from 'react-router-dom'
import MainPage from 'pages/main/MainPage/MainPage'
import BaseFormElementAPI from 'pages/main/FormAPI/BaseFormElementAPI'
import DatePickerAPI from 'pages/main/FormAPI/DatePicker'

import StoreTemplate from 'pages/main/Store/StoreTemplate'
import StoreManage from 'pages/main/systemSetting/StoreManage'
import FoodMenuManage from 'pages/main/systemSetting/FoodMenuManage'
import NoMatch from 'pages/404'

export default function MainRoute(){
    return (
        <Switch>
            <Route path="/main/MainPage" component={MainPage} />
            <Route path="/main/StoreManage" component={StoreManage} />
            <Route path="/main/FormElementAPI">
                <BaseFormElementAPI>
                    <Route path="/main/FormElementAPI/DatePicker" component={DatePickerAPI} />
                </BaseFormElementAPI>
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