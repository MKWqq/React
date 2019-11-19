import React, {PureComponent,} from "react";
import {Form,Input,} from 'antd';
import ImageUpload from "../../../libs/components/upload/index";

let formItemLayout = {
  labelCol: { span: 8, },
  wrapperCol: { span: 16, },
};

@Form.create()
export default class InputForm extends PureComponent {
  state = {};
  render() {
    const { form: {getFieldDecorator,},layout, } = this.props;
    if (layout === "vertical") {
      formItemLayout = {};
    }
    return (
      <Form
        className="login-form"
        layout={layout ? layout : "inline"}
      >
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
        <Form.Item
          label="这个地址前面有点长"
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
        <Form.Item
          label="图片"
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
            <ImageUpload />
          )}
        </Form.Item>
        <Form.Item
          label="这个地址前面有点长"
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
