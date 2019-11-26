import React from 'react';
import {Menu, Icon, Button} from 'antd';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import menuConfig from 'assets/js/menuConfig';
import MainPage from 'pages/MainPage'
import StoreManage from 'pages/systemSetting/StoreManage'

const {SubMenu} = Menu;

export default class NavLeft extends React.Component {

	state = {
		collapse: false,
		menuItemDOM: null
	};
	collapseClick = () => {
		this.setState({
			collapse: !this.state.collapse
		});
	};

	renderMenu = (menuArr) => {
		return menuArr.map((item) => {
			if (item.children && item.children.length) {
				return (
					<SubMenu key={item.key} title={
						<span>
						{(item.iconType) && (<Icon type={item.iconType}/>)}
							<span>{item.title}</span>
					</span>
					}>{this.renderMenu(item.children)}</SubMenu>
				)
			} else {
				return (
					<Menu.Item key={item.key}>
						<Link to={item.path}>
							{(item.iconType) && (<Icon type={item.iconType}/>)}
							<span>{item.title}</span>
						</Link>
					</Menu.Item>
				)
			}
		})
	};

	componentWillMount() {
		let menuItemDOM = this.renderMenu(menuConfig);
		this.setState({
			menuItemDOM
		})
	}

	render() {
		return (
			<div style={{width: 200}}>
				<Router>
					<Button onClick={this.collapseClick} type="primary">
						<Icon type="mail"/>
					</Button>
					<Menu defaultOpenKeys={["2"]} defaultSelectedKeys={["1"]} mode="inline" theme="light"
					      inlineCollapsed={this.state.collapse}>
						{this.state.menuItemDOM}
					</Menu>
					<Switch>
						<Route path="/MainPage" component={MainPage}/>
						<Route path="/StoreManage" component={StoreManage}/>
					</Switch>
				</Router>
			</div>
		);
	}
}