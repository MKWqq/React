/**
 * 登录页面
 * */
import React, {Component} from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import './login.less'
import {connect} from 'react-redux';
import {saveLoginMessage} from 'reduxDir/action'
import history from 'router/history'; // history.push() ——非react组件用法

class LoginForm extends Component {
	state={
		formInitValueObject:{},// form表单初始化数据。从redux拿，需要判断是否有值。
	};

	submitForm = (e) => {
        let {dispatch}=this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			console.log('errs：', err, 'values：', values);
			if(!err){
			//	校验通过
				dispatch(saveLoginMessage(values));
				history.push('/main/MainPage');
			}
		});
	};

	componentDidMount(){
		/* 判断redux中是否有登录信息，且判断上次登录是否需要保存登录信息 */
		let _initData={};
		let {loginMessage}=this.props;
		if(loginMessage){
			// redux有值。通过判断是否记住密码来判断是否展示上次登录信息
			_initData={
				userName:loginMessage.isRemember?loginMessage.userName:'',password:loginMessage.isRemember?loginMessage.password:'',isRemember:true
			};
		}else{
			// redux无值，设置默认登录信息
			_initData={
				userName:'',password:'',isRemember:true
			};
		}
		this.setState({
			formInitValueObject:_initData
		});
	}

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
						initialValue: this.state.formInitValueObject.userName
					})(
						<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
						       placeholder="请输入用户名"/>
					)}
				</Form.Item>
				<Form.Item label='密码'>
					{getFieldDecorator('password', {
						rules: [{required: true, message: '请输入密码'}],
						initialValue:this.state.formInitValueObject.password
					})(
						<Input type='password' prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
						       placeholder={'请输入密码'}/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('isRemember',{
						valuePropName:'checked',
						initialValue:this.state.formInitValueObject.isRemember
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