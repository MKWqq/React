import React from 'react';
import { Menu, Icon, Button } from 'antd';

const { SubMenu } = Menu;

export default class NavLeft extends React.Component{

	state={
		collapse:false
	};
	collapseClick=()=>{
		this.setState({
			collapse:!this.state.collapse
		});
	};
	render() {
		return (
			<div>
				<Button onClick={this.collapseClick} type="primary">
					<Icon type="mail" />
				</Button>
				<Menu defaultOpenKeys={["2"]} defaultSelectedKeys={["1"]} mode={"inline"} theme={"light"} inlineCollapsed={this.state.collapse}>
					<Menu.Item key="1">
						<Icon type="star" />
						<span>首页</span>
					</Menu.Item>
					<SubMenu key="2" title={
						<span>
						<Icon type="mail" />
						<span>系统设置</span>
					</span>
					}>
						<Menu.Item key="3">门店管理</Menu.Item>
					</SubMenu>
					<SubMenu key="4" title={
						<span>
						<Icon type="appstore" />
						<span>门店</span>
					</span>
					}>
						<Menu.Item key="5">春熙路小龙坎</Menu.Item>
					</SubMenu>
				</Menu>
			</div>
		);
	}
}