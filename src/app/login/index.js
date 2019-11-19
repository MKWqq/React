import React, {Component,} from "react";
import {withRouter, } from "react-router-dom";
import Cookies from "js-cookie";
import md5 from 'md5';
import { Form, Input,Spin,message, } from 'antd';
import {post,HOST_API,} from "../../libs/api/index";
import {CopyRight,SystemName,} from "../../util/const";
import {loginAccount,loginImgCode,} from "../../util/regular";
import logoImg from '../../assets/img/logo.png';
import UserInfo from '../../store/user-info';
import "./index.less";

@Form.create()
@withRouter

export default class Login extends Component {
  state = {
    "account": "",
    "password": "",
    "imgCode": "",
    random: (new Date()).getTime(),
    loading: false,
    pwdShow: false,
    focusItem: '',
  };
  rules = {
    account:[
      {
        required: true,
        message: '请输入用户名',
      },
      {
        pattern: loginAccount,
        message: "请输入正确的用户名",
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
      },
    ],
    imgCode: [
      {
        required: true,
        message: '请输入验证码',
      },
      {
        pattern: loginImgCode,
        message: '请输入正确的验证码',
      },
    ],
  }
  render() {
    const {loading,pwdShow,focusItem,random,} = this.state;
    const {form,} = this.props;
    const { getFieldDecorator,} = form;
    return (
      <div className="bg login-page">
        <div className="login-box">
          <div className="login">
            <div className="logo-bg">
              <img
                src={logoImg}
                className='icon-logo'
              />
              <p className='system-name'>{SystemName}</p>
            </div>
            <Form
              className={`login-form ${focusItem}`}
            >
              <Form.Item className="account-item">
                {getFieldDecorator('account', {
                  rules: this.rules.account,
                })(
                  <Input
                    addonBefore={
                      <span
                        className='iconfont icon-yonghuming'
                      />
                    }
                    onFocus={() => this.setState({focusItem: "account",})}
                    onBlur={() => this.setState({focusItem: "",})}
                    autoComplete="off"
                    placeholder="请输入用户名"
                  />
                )}
              </Form.Item>
              <Form.Item className="password-item">
                {getFieldDecorator('password', {
                  rules: this.rules.password,
                })(
                  <Input
                    addonBefore={
                      <span
                        className='iconfont icon-lock'
                      />
                    }
                    addonAfter={
                      <span
                        onClick={this.toggleShowPwd}
                        className={`iconfont ${pwdShow ? 'icon-yanjing' : 'icon-chakanyanjingshishifenxi'}`}
                      />
                    }
                    onFocus={() => this.setState({focusItem: "password",})}
                    onBlur={() => this.setState({focusItem: "",})}
                    autoComplete="off"
                    placeholder="请输入密码"
                    type={!pwdShow ? 'password' : 'text'}
                  />
                )}
              </Form.Item>
              <Form.Item className="imgCode-item">
                {getFieldDecorator('imgCode', {
                  rules: this.rules.imgCode,
                })(
                  <Input
                    addonBefore={
                      <span
                        className='iconfont icon-yanzhengmatianchong'
                      />
                    }
                    addonAfter={
                      <img
                        src={`${HOST_API}system/imgIdentifyingCode?t=${random}`}
                        onClick={this.updateImg}
                        className="img-code"
                      />
                    }
                    onFocus={() => this.setState({focusItem: "imgCode",})}
                    onBlur={() => this.setState({focusItem: "",})}
                    autoComplete="off"
                    placeholder="请输入验证码"
                    type="text"
                  />
                )}
              </Form.Item>
              <button
                className="login-form-button"
                type="submit"
                disabled={loading}
                onClick={this.submit}
              >
                {
                  loading ? (
                    <Spin
                      wrapperClassName="loading"
                    />
                  ) : "登录"
                }
              </button>
            </Form>
          </div>
          <p className="copy-right">{CopyRight}</p>
        </div>
      </div>
    );
  }
  updateImg = () => {
    this.setState({
      random: new Date().getTime(),
    });
  }
  /**
   * 表单校验
   * @param e
   * @returns {Promise<void>}
   */
  submit = async (e) => {
    e.preventDefault();
    const {form,} = this.props;
    form.validateFields((err,val) => {
      if (!err) {
        this.setState({
          loading: true,
        },() => {this.login(val);});
        return;
      }
      if (err.account) {
        message.error("请输入正确的用户名");
      }
    });
  };
  /**
   * 提交数据
   * @param params
   * @returns {Promise<void>}
   */
  login = async (params) => {
    const {history,} = this.props;
    const url = `system/signIn`;
    params.password = md5(params.password);
    const {ecode,data,message:msg,} = await post(url,{...params,source: "Pc",});
    this.setState({
      loading: false,
    });
    if (ecode) {
      message.error(msg);
    } else {
      const token = data.token;
      if (!token.length) {
        message.error("登录失败");
        return;
      }
      Cookies.set('SystemToken', token);
      UserInfo.updateUserInfo();
      history.push({
        pathname: '/home',
      });
    }
  };
  /**
   * 切换密码显示
   */
  toggleShowPwd = () => {
    const {pwdShow,} = this.state;
    this.setState({
      pwdShow: !pwdShow,
    });
  }
}
