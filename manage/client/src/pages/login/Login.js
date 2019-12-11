/**
 * 登录页面
 * */
import React, {Component} from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import './login.less'

class LoginForm extends Component {
	submitForm = (e) => {
		e.preventDefault();
		this.props.form.validateFields((errs, values) => {
			console.log('errs：', errs, 'values：', values);
		});
	};

	render() {
		const {getFieldDecorator} = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 6}
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 18}
			}
		};
		return (
			<Form {...formItemLayout} onSubmit={this.submitForm} className='login-form'>
				<Form.Item label='用户名'>
					{getFieldDecorator('userName', {
						rules: [{required: true, message: '请输入用户名'}],
						initialValue: 'wqq'
					})(
						<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
						       placeholder="请输入用户名"/>
					)}
				</Form.Item>
				<Form.Item label='密码'>
					{getFieldDecorator('password', {
						rules: [{required: true, message: '请输入密码'}],
						initialValue:'0'
					})(
						<Input type='password' prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
						       placeholder={'请输入密码'}/>
					)}
				</Form.Item>
				<Form.Item style={{textAlign:'center'}}>
					<Button type='primary' htmlType='submit'>登录</Button>
				</Form.Item>
			</Form>
		)
	}
}

export default Form.create({name: 'login-form'})(LoginForm);