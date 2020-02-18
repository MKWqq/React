// Button页面
import React,{Component} from 'react'
import {Button,Card,Radio} from 'antd'
import '../../less/UI/button.less'

export default class UIButton extends Component{
	constructor(props){
		super(props);
		this.state={
			size:'large'
		}
	}

	changeSize(e){
		console.log(e.target.value);
		this.setState({
			size:e.target.value
		});
	}

	render(){
		return (
			<div className='g-ui-button'>
				<Card title='基础按钮'>
					<Button type='primary'>primary</Button>
					<Button className='margin-right-10'>default</Button>
					<Button type='dashed'>dashed</Button>
					<Button type="danger">danger</Button>
					<Button disabled>disabled</Button>
				</Card>
				<Card className='margin-top-10' title='图形按钮'>
					<Button icon="plus">创建</Button>
					<Button icon="edit">编辑</Button>
					<Button icon="delete">删除</Button>
					<Button shape="circle" icon="search" />
					<Button type='primary' icon='search'>搜索</Button>
					<Button type="primary" icon="download">下载</Button>
				</Card>
				<Card className="margin-top-10" title="Loading按钮">
					<Button type='primary' icon="loading">确定</Button>
					<Button type='primary' shape="circle" icon="loading" />
					<Button icon="loading">点击加载</Button>
					<Button icon="loading">确定</Button>
					<Button shape="circle" icon="loading" />
					<Button type="primary">关闭</Button>
				</Card>
				<Card className="margin-top-10" title="按钮组及按钮大小">
					<Radio.Group value={this.state.size} onChange={(e)=>this.changeSize(e)}>
						<Radio value="large">大</Radio>
						<Radio value="default">中</Radio>
						<Radio value="small">小</Radio>
					</Radio.Group>
					<Button.Group size={this.state.size}>
						<Button type="primary" icon="left">返回</Button>
						<Button type="primary" icon="right">前进</Button>
					</Button.Group>
				</Card>
			</div>
		);
	}
}