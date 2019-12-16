/**
 * 主业务入口文件 */
import React,{Component} from 'react'
import Header from 'components/Header'
import NavLeft from 'components/NavLeft'

export default class Main extends Component{
    render(){
        return (
            <div>
                <Header />
                <div className="display-flex">
                    <NavLeft />
                    {this.props.children}
                </div>
            </div>
        )
    }
}