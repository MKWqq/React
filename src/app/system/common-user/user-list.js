import React, {PureComponent,} from "react";
import {withRouter,} from "react-router-dom";
import CreateTable from "../../../libs/components/create-table/index";

@withRouter
export default class DangerNotice extends PureComponent {
  state = {
    modalInfo: {
      title: "用户",
    },
    editItem: {},
  };
  getSearchItems = [
    {
      type: "select",
      name: "education",
      title: "学历",
      defaultValue: 1,
      selectOptions: "education/educationList",
    },
    {
      type: "treeSelect",
      name: "nativeCity",
      title: "籍贯",
      selectOptions: "nativeCity/list",
    },
    {
      title: "出生日期",
      name: "rangePicker",
      type: "rangePicker",
      defaultValue: [moment("2018-10-01"),moment("2018-10-02"),],
      otherParams: {
        showTime: true,
        format: "YYYY-MM-DD HH:ss",
      },
    },
    {
      title: "出生年份",
      name: "yearPicker",
      type: "yearPicker",
    },
    {
      title: "出生月份",
      name: "monthPicker",
      type: "monthPicker",
      show: false,
      otherParams:{
        allowClear: true,
      },
    },
    {
      title: "周选择",
      name: "weekPicker",
      type: "weekPicker",
      show: false,
      otherParams:{
        allowClear: true,
      },
    },
    {
      title: "日期选择",
      name: "datePicker",
      type: "datePicker",
      show: false,
      otherParams:{
        allowClear: true,
      },
    },
    {
      title: "关键字",
      name: "input",
      otherParams:{
        placeholder: "请输入姓名或者学历",
      },
    },
  ];
  getActionItems = [
    {
      title: "新增用户",
      type: "add",
      url: "/systemSetting/userList/commonUser/commonUserAdd",
    },
    {
      title: "下载模版",
      type: "downloadTemplateFile",
      url: "./api/file/download",
    },
    {
      title: "自定义icon",
      icon: <span className="icon icon-dot" />,
      onClick: (e) => {
        console.log(111, e);
      },
    },
    {
      title: "导入用户",
      type: "importFile",
      url: "./api/file/upload",
    },
  ];
  render() {
    return (
      <div>
        <CreateTable
          url="user/userList"
          searchItems={this.getSearchItems}
          searchActionItems={this.getActionItems}
          actionColumns={this.tableActions()}
          columns={this.tableColumns()}
        />
      </div>
    );
  }
  tableActions = () => {
    return [
      {
        title: "是否开启",
        render: (text,record,index) => {
          return index % 2 === 0 ? <span>开启</span> : <span>关闭</span>;
        },
        onClick: (btn,) => {
          alert(btn.title);
        },
      },
      {
        type: "detail",
        url: "/systemSetting/userList/commonUser/commonUserDetail",
      },
      {
        type: "edit",
        url: "/systemSetting/userList/commonUser/commonUserEdit",
      },
      {
        title: "删除",
        type: "del",
        disable: (text,record,index) => {
          return index % 2 === 0;
        },
        url: "user/userDelete",
      },
    ];
  };
  tableColumns = () => {
    return [
      {
        title: "用户名",
        dataIndex: "userName",
      },
      {
        title: "年龄",
        dataIndex: "age",
      },
      {
        title: "年龄",
        dataIndex: "sex",
      },
      {
        title: "名族",
        dataIndex: "nation",
      },
      {
        title: "地址",
        dataIndex: "address",
        maxNumber: 10,
      },
    ];
  }
}
