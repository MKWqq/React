import React, {PureComponent,} from "react";
import {Form,Input,Switch,} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 6, },
    sm: { span: 6, },
  },
  wrapperCol: {
    xs: { span: 6, },
    sm: { span: 16, },
  },
};

@Form.create()
export default class InputForm extends PureComponent {
  state = {};
  render() {
    const { form: {getFieldDecorator,}, } = this.props;
    return (
      <Form className="login-form">
        <Form.Item
          label="用户名"
          {...formItemLayout}
        >
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: '请输入用户名',
              },
            ],
          })(
            <Input
              placeholder="请输入用户名"
            />
          )}
        </Form.Item>
        <Form.Item
          label="用户名"
          {...formItemLayout}
        >
          {getFieldDecorator('age', {
            rules: [
              {
                required: true,
                message: '请输入年龄',
              },
            ],
          })(
            <Input
              placeholder="请输入年龄"
            />
          )}
        </Form.Item>
        <Form.Item
          label="sex"
          {...formItemLayout}
        >
          {getFieldDecorator('open', {
            valuePropName: "checked",
            initialValue: true,
          })(
            <Switch
              checkedChildren="男"
              unCheckedChildren="女"
            />
          )}
        </Form.Item>
        <Form.Item
          label="名族"
          {...formItemLayout}
        >
          {getFieldDecorator('nation', {
            rules: [
              {
                required: true,
                message: '请输入名族',
              },
            ],
          })(
            <Input
              placeholder="请输入名族"
            />
          )}
        </Form.Item>
        <Form.Item
          label="地址"
          {...formItemLayout}
        >
          {getFieldDecorator('address', {
            rules: [
              {
                pattern: /^[\s\S]{0,30}$/,
                message: '请输入30字以内',
              },
            ],
          })(
            <Input
              placeholder="30字以内"
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}
