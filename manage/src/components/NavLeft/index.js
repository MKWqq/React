import React from 'react';
import {Menu, Icon, Button} from 'antd';
import {Link} from 'react-router-dom';
import menuConfig from 'assets/js/menuConfig';
import { connect } from 'react-redux';
import {SwitchMenu} from './../../redux/action';

const {SubMenu} = Menu;

class NavLeft extends React.Component {

	state = {
        currentMenuKey:"",
		collapse: false,
		menuItemDOM: null
	};

    componentDidMount(){
        let menuItemDOM = this.renderMenu(menuConfig);
        this.setState({
            menuItemDOM
        })
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
    menuItemClick=(item)=>{
    	const {dispatch}=this.props;
    	dispatch(SwitchMenu(item.key));
    	this.setState({
			currentMenuKey:item.key
		});
    };

	render() {
		return (
			<div style={{width: 200}}>
				<Button onClick={this.collapseClick} type="primary">
					<Icon type="mail"/>
				</Button>
				<Menu onClick={this.menuItemClick} defaultOpenKeys={["2"]} selectedKeys={[this.state.currentMenuKey]} mode="inline" theme="light"
				      inlineCollapsed={this.state.collapse}>
					{this.state.menuItemDOM}
				</Menu>
				{this.props.children}
			</div>
		);
	}
}

export default connect()(NavLeft);