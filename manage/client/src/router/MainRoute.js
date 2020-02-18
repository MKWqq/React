/**
 * main相关路由匹配
 * */
import React from 'react'
import {Switch,Route} from 'react-router-dom'
import MainPage from 'pages/main/MainPage/MainPage'
import UIButton from 'pages/main/UI/Button'
import UIModal from 'pages/main/UI/Modal'
import UILoading from 'pages/main/UI/Loading'
import UINotify from 'pages/main/UI/Notify'
import UIMessage from 'pages/main/UI/Message'
import UITab from 'pages/main/UI/Tab'
import UIGallery from 'pages/main/UI/Gallery'
import UICarousel from 'pages/main/UI/Carousel'

import FormLogin from 'pages/main/form/Login'
import FormRegister from 'pages/main/form/Register'

import BasicTable from 'pages/main/table/BasicTable'
import HighTable from 'pages/main/table/HighTable'

import Rich from 'pages/main/rich/Rich'

import Bar from 'pages/main/charts/Bar'
import Pie from 'pages/main/charts/Pie'
import Line from 'pages/main/charts/Line'

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
            <Route path="/main/UI">
                <Route path="/main/UI/Button" component={UIButton} />
                <Route path="/main/UI/Modal" component={UIModal} />
                <Route path="/main/UI/Loading" component={UILoading} />
                <Route path="/main/UI/Notify" component={UINotify} />
                <Route path="/main/UI/Message" component={UIMessage} />
                <Route path="/main/UI/Tab" component={UITab} />
                <Route path="/main/UI/Picture" component={UIGallery} />
                <Route path="/main/UI/Carousel" component={UICarousel} />
            </Route>
            <Route path="/main/form">
                <Route path="/main/form/login" component={FormLogin} />
                <Route path="/main/form/register" component={FormRegister} />
            </Route>
            <Route path="/main/table">
                <Route path="/main/table/BasicTable" component={BasicTable} />
                <Route path="/main/table/HighTable" component={HighTable} />
            </Route>
            <Route path="/main/rich" component={Rich} />
            <Route path="/main/charts">
                <Route path="/main/charts/Bar" component={Bar} />
                <Route path="/main/charts/Pie" component={Pie} />
                <Route path="/main/charts/Line" component={Line} />
            </Route>
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