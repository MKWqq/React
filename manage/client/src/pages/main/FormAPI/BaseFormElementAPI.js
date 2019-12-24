/**
 * antd表单元素的使用API
 * */
import React from 'react'

export default class BaseFormElementAPI extends React.Component{

	render(){
		return (
			<div>
				<p>form element common</p>
				{this.props.children}
			</div>
		)
	}
}