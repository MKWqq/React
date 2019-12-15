import React from 'react';
import {Menu, Icon, Button} from 'antd';
import {Link} from 'react-router-dom';
import menuConfig from 'assets/js/menuConfig';
import {connect} from 'react-redux';
import {SwitchMenu} from 'reduxDir/action';

const {SubMenu} = Menu;

class NavLeft extends React.Component {

	state = {
		collapse: false,
		menuItemDOM: null
	};

	componentDidMount() {
		let menuItemDOM = this.renderMenu(menuConfig);
		this.setState({
			menuItemDOM
		});
	}

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
					<Menu.Item key={item.key} title={item.title}>
						<Link to={item.path}>
							{(item.iconType) && (<Icon type={item.iconType}/>)}
							<span>{item.title}</span>
						</Link>
					</Menu.Item>
				)
			}
		})
	};
	menuItemClick = ({item, key, keyPath}) => {
		const {dispatch} = this.props;
		dispatch(SwitchMenu({title: item.props.title, selectKey: key,selectKeyPath:keyPath}));
	};

	render() {
		return (
			<div style={{width: 200}}>
				<Button onClick={this.collapseClick} type="primary">
					<Icon type="mail"/>
				</Button>
				<Menu onClick={this.menuItemClick} defaultOpenKeys={this.props.menuValue.selectKeyPath}
				      selectedKeys={[this.props.menuValue.selectKey]} mode="inline" theme="light"
				      inlineCollapsed={this.state.collapse}>
					{this.state.menuItemDOM}
				</Menu>
				{this.props.children}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menuValue: state.menuValue
	}
};

export default connect(mapStateToProps)(NavLeft);