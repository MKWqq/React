/**
 * 主业务入口文件 */
import React,{Component} from 'react'
import Header from 'components/Header'
import NavLeft from 'components/NavLeft'
import './index.css'

export default class Main extends Component{
    render(){
        return (
            <div>
                <Header />
                <div className="display-flex">
                    <NavLeft />
                    <div className="g-main-container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}