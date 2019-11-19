import React, {PureComponent,} from "react";
import CreateTable from "../../../libs/components/create-table/index";
import FormModal from "../../../libs/components/form-modal/index";

export default class UserList extends PureComponent {
  state = {
    formData: {},
  };
  render() {
    const {formData,} = this.state;
    return (
      <div>
        <CreateTable
          searchItems={this.getSearchItems()}
          searchActionItems={this.getSearchActionItem()}
          url="user/userList"
          otherParams={{sex: 1,}}
          columns={this.tableColumns()}
          actionColumns={this.getActionColumns()}
        />
        <FormModal
          ref={ref => this.modalRef = ref}
          title="用户"
          detailData={formData}
          actionSrc={
            {
              edit: "user/userList",
              add: "user/userList",
            }
          }
          items={this.getFormItems}
        />
      </div>
    );
  }
  goEdit = (item) => {
    this.setState({
      formData: item,
    }, this.modalRef.show);
  };
  getFormItems = [
    {
      title: "用户名",
      name: 'userName',
    },
    {
      title: "性别",
      type: "select",
      name: "sex",
      selectOptions: [
        {
          title: "男",
          value: 1,
        },
        {
          title: "女",
          value: 2,
        },
      ],
    },
    {
      title: "头像",
      type: "uploadImg",
      name: "icon",
      otherParams: {
        maxNumber: 1,
      },
    },
    {
      title: "备注",
      name: "remark",
      rule: {
        required: true,
      },
    },
  ];
  getSearchActionItem = () => {
    return [
      {
        type: "add",
        title: "新增用户",
        onClick: () => {
          this.modalRef.show(true);
        },
      },
    ];
  }
  getSearchItems = () => {
    return [
      {
        type: "select",
        name: "sex",
        title: "性别",
        defaultValue: "2",
        selectOptions: [
          {
            title: "男",
            value: 1,
          },
          {
            title: "女",
            value: 2,
          },
        ],
      },
      {
        title: "关键字",
        name: "keyword",
        otherParams: {
          placeholder: "请输入用户名或者年龄",
        },
      },
    ];
  };
  getActionColumns = () => {
    return [
      {
        type: "detail",
        url: '/systemSetting/userList/commonUser/commonUserDetail',
      },
      {
        title: "开启",
        disable: (text, record,index,) => {
          return index % 2 === 0;
        },
      },
      {
        type: "edit",
        onClick: (e, text,record,) => {
          this.goEdit(record);
        },
      },
      {
        type: "del",
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
        title: "性别",
        dataIndex: "sex",
        render: (text,) => {
          const map =  {1: "男",2: "女",};
          return map[text];
        },
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
