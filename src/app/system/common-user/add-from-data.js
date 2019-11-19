import React from "react";
import CarNumber from "../../../libs/components/car-number-input/car-number-input";

// default，uploadImg, uploadFile, switch, select, datePicker, yearPicker, monthPicker, weekPicker,rangePicker, treeSelect

export default [
  {
    title: "基础信息",
    formItemLayout: {
      labelCol: { span: 6, },
      wrapperCol: { span: 14, },
    },
    data: [
      [
        {
          title: "姓名",
          name: "username",
          rule: {
            required: true,
            pattern: /^\w{2,5}$/,
          },
        },
        {
          title: "年龄",
          name: "age",
          rule: {
            required: true,
            pattern: /^[1-9]\d?$/,
          },
        },
        {
          title: "学历",
          name: "education",
          type: "select",
          selectOptions: "education/educationList",
          rule: {
            required: true,
          },
        },
      ],
      [
        {
          title: "性别",
          name: "sex",
          type: "select",
          selectOptions: ["男", "女",],
          rule: {
            required: true,
          },
        },
        {
          title: "身份证号码",
          name: "idNumber",
          placeholder: "17位数字",
          rule: {
            required: true,
            pattern: /^\d{17}$/,
          },
        },
        {
          title: "头像",
          name: "icon",
          type: "uploadImg",
          otherParams: {
            maxNumber: 2, //只能上传一张图片
          },
          rule: {
            required: true,
          },
        },
      ],
    ],
  },
  {
    title: "其他信息",
    formItemLayout: {
      labelCol: { span: 6, },
      wrapperCol: { span: 14, },
    },
    data: [
      [
        {
          title: "生日",
          name: "birthday",
          otherParams: {
            format: "YYYY-MM-DD",
          },
        },
        {
          title: "自定义类型",
          name: "customInput",
          otherParams: {
            format: "YYYY-MM-DD",
          },
          component: CarNumber,
        },
        {
          title: "年选择器",
          name: "yearPicker",
          type: "yearPicker",
          otherParams: {
            format: "YYYY-MM-DD",
          },
        },
        {
          title: "范围选择器",
          name: "rangePicker",
          type: "rangePicker",
          otherParams: {
            format: "YYYY-MM",
          },
        },
        {
          title: "开始时间",
          name: "startTime",
          type: "datePicker",
          otherParams: {
            format: "YYYY-MM-DD",
          },
          rule: {
            validator: function (rule, value, callback) {
              const {form,} = this.props;
              const endTime = form.getFieldValue('endTime');
              if (value && endTime && value > endTime) {
                callback("开始时间不能大于结束时间");
              } else {
                callback();
              }
            },
          },
        },
        {
          title: "结束时间",
          name: "endTime",
          type: "datePicker",
          otherParams: {
            format: "YYYY-MM-DD",
          },
          rule: {
            validator: function (rule, value, callback) {
              const {form,} = this.props;
              const startTime = form.getFieldValue('startTime');
              if (value && startTime && value < startTime) {
                callback("结束时间不能小于开始时间");
              } else {
                callback();
              }
            },
          },
        },
        {
          title: "籍贯",
          name: "nativeCity",
          type: "treeSelect",
          selectOptions: [
            {
              title: "重庆",
              value: 1,
              children: [
                {
                  title: "江北",
                  value: 11,
                },
                {
                  title: "朝天门",
                  value: 12,
                },
              ],
            },
            {
              title: "四川",
              value: 2,
              children: [
                {
                  title: "武侯",
                  value:21,
                },
                {
                  title: "锦江",
                  value: 22,
                },
              ],
            },
          ],
        },
        {
          title: "籍贯2",
          name: "nativeCity2",
          type: "treeSelect",
          selectOptions: "nativeCity/list",
          otherParams: {
            multiple: true,
          },
        },
        {
          title: "是否会React",
          name: "knowReact",
          type: "switch",
          otherParams: {
            checkedChildren:"是",
            unCheckedChildren:"否",
          },
        },
        {
          title: "头像",
          name: "icon2",
          type: "uploadImg",
          otherParams: {
            maxNumber: 1, //只能上传一张图片
          },
        },
        {
          title: "附件",
          name: "files",
          type: "uploadFile",
          otherParams: {
            maxNumber: 2, //只能上传一张图片
          },
        },
      ],
    ],
  },
  {
    title: "个人简介",
    data: <p>暂无个人简介</p>,
  },
];
