/**
 * store
 * */
import React,{Component} from 'react'

export default class ChildStore extends Component{

	render(){
		return (
			<div>this is child {this.props.match.params.id} page</div>
		)
	}
}