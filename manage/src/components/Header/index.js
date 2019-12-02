import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends React.Component{

	render(){
		return (
			<div>
				<Link to="/login">退出登录</Link>
				<p>{this.props.menuValue.title}</p>
			</div>
		);
	}
}
const mapStateToProps=(state)=>{
    return {
        menuValue:state&&state.menuValue
    }
};
export default connect(mapStateToProps)(Header);