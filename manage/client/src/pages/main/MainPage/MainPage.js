/**
 * 首页
 * */
import React from 'react';
import Http from 'assets/http'

export default class MainPage extends React.Component{

	componentDidMount(){
		Http.post('/test').then(data=>{
			console.log(data);
		}).catch(err=>{
			console.log(err);
		});
	}

	render(){
		return (
			<div>
				this is main page
			</div>
		);
	}
};