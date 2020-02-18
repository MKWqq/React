/**
 * 首页
 * */
import React from 'react';
import Http from 'assets/http'

export default class MainPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading:true
		};
		console.log('constructor');
	}

	static getDerivedStateFromProps(nextProps,prevState){
		console.log('getDerivedStateFromProps',nextProps,prevState);
		return null;
	}

	render(){
		console.log('render');
		return (
			<div>
				this is main page
				生命周期：MainPage+UI/Button
			</div>
		);
	}

	componentDidMount(){
		console.log('componentDidMount:发送请求在此生命周期中',this.state.loading);
		// Http.post('/test').then(data=>{
		// 	console.log(data);
		// }).catch(err=>{
		// 	console.log(err);
		// });
	}
};