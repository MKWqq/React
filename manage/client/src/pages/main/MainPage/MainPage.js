/**
 * 首页
 * */
import React from 'react';
import {Card} from 'antd';
import Http from 'assets/http'

export default class MainPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			password:''
		};
		console.log('constructor');
	}

	static getDerivedStateFromProps(nextProps,prevState){
		console.log('创建及更新触发的生命周期getDerivedStateFromProps',nextProps,prevState);
		return null;
	}

	shouldComponentUpdate(nextProps,nextState){
		console.log('更新时触发的生命周期shouldComponentUpdate');
		return true;
	}

	getSnapshotBeforeUpdate(prevProps,prevState){
		console.log('更新时触发的生命周期getSnapshotBeforeUpdate');
		return null;
	}

	/* methods */
	inputChange(e){
		this.setState({
			[e.target.name]:e.target.value
		});
	}

	render(){
		console.log('创建及更新时调用的生命周期render',this.state);
		return (
			<div>
				<Card title="生命周期展示">
					<div>
						<aside className='float-left' style={{width:'500px'}}>
							<header className="h3 border-bottom-gray">创建时调用的生命周期</header>
							<section>
								<p className='t-primary'>constructor</p>
								<p>static getDerivedStateFromProps——返回null/object：object为state的新值，null表示对state不做处理</p>
								<p className='t-primary'>render</p>
								<p className='t-primary'>componentDidMount</p>
							</section>
						</aside>
						{/* overflow:hidden;是为了创建BFC，为了此处内容不被float box
						 内容遮挡*/}
						<aside className="padding-left-30 overflow-hidden">
							<header className="h3 border-bottom-gray">数据更新时的生命周期</header>
							<section className="word-break-all">
								<p>static getDerivedStateFromProps——返回null/object:object为state的新值，null表示对state不做处理</p>
								<p>shouldComponentUpdate——返回true/false</p>
								<p>getSnapshotBeforeUpdate——返回null/snapshot的值：snapshot值为componentDidUpdate的第三个参数</p>
								<p className='t-primary'>componentDidUpdate</p>
							</section>
						</aside>
					</div>
					<p>生命周期：MainPage+UI/Button</p>
				</Card>
				<Card title="受控组件之Form标签">
					<input className='border-red' type="text" name='name' value={this.state.name} onChange={(e)=>this.inputChange(e)} />
					<input className="border-red" type="text" name='password' value={this.state.password} onChange={(e)=>this.inputChange(e)} />
				</Card>
			</div>
		);
	}

	componentDidUpdate(prevProps,prevState,snapshot){
		console.log('更新时调用的生命周期componentDidUpdate','snapshot为getSnapshotBeforeUpdate的返回值');
	}

	componentDidMount(){
		console.log('创建时的生命周期componentDidMount:发送请求在此生命周期中',this.state.loading);
		// Http.post('/test').then(data=>{
		// 	console.log(data);
		// }).catch(err=>{
		// 	console.log(err);
		// });
	}
};