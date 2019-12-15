/**
 * 登录页面
 * */
import React, {Component} from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import './login.less'
import {connect} from 'react-redux';
import {saveLoginMessage} from 'reduxDir/action'
import {useHistory} from 'react-router-dom'

class LoginForm extends Component {
	submitForm = (e) => {
        let {dispatch}=this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			console.log('errs：', err, 'values：', values);
			if(!err){
			//	校验通过
				dispatch(saveLoginMessage(values));
                useHistory().push('/main/MainPage');
			}
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
			<Form {...formItemLayout} onSubmit={this.submitForm} className='login-form transform-v-h-center'>
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
				<Form.Item>
					{getFieldDecorator('isRemember',{
						valuePropName:'checked',
						initialValue:true
					})(
						<Checkbox>记住密码</Checkbox>
					)}
				</Form.Item>
				<Form.Item style={{textAlign:'center'}}>
                    <Button type='primary' htmlType='submit'>登录</Button>
				</Form.Item>
			</Form>
		)
	}
}

const mapStateToProps=(state)=>{
	return {loginMessage:state.loginMessage};
};

export default connect(mapStateToProps)(Form.create({name: 'login-form'})(LoginForm));