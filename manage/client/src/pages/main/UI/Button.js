// Button页面
import React,{Component} from 'react'
import {Button,Card} from 'antd'
import '../../less/UI/button.less'

export default class UIButton extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className='g-ui-button'>
				<div className='clear-float-table' style={{border:'1px solid red'}}>
					<div className='float-left'>133</div>
				</div>
				<div className='g-ui-button-part1'>
					<header className='h3 padding-bottom-10 border-bottom-gray'>基础按钮</header>
					<section className='padding-top-10'>
						<Button className='margin-right-10' type='primary'>primary</Button>
						<Button className='margin-right-10'>default</Button>
						<Button className='margin-right-10' type='dashed'>dashed</Button>
						<Button className='margin-right-10' type="danger">danger</Button>
						<Button className='margin-right-10' disabled>disabled</Button>
					</section>
				</div>
				<Card title='基础按钮'>
					<Button className='margin-right-10' type='primary'>primary</Button>
					<Button className='margin-right-10'>default</Button>
					<Button className='margin-right-10' type='dashed'>dashed</Button>
					<Button className='margin-right-10' type="danger">danger</Button>
					<Button className='margin-right-10' disabled>disabled</Button>
				</Card>
				<Card className='margin-top-10' title='图形按钮'>
					<Button>test</Button>
				</Card>
			</div>
		);
	}
}