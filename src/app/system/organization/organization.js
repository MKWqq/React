import React, {PureComponent,} from "react";
import {Table,Button,message,Modal,} from "antd";
import FormModal from "../../../libs/components/form-modal/index";
import {formatValue,} from "../../../util";
import {get,} from "../../../libs/api";
import InputForm from './input-form';
import './index.less';

let modalRef;

export default class Organization extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editItem: {},
      data: [],
      uploading: false,
    };
  }
  render() {
    const {data,editItem,} = this.state;
    return (
      <div>
        <div className="common-container organization-table">
          <Table
            rowKey={({id,}) => id}
            dataSource={data}
            pagination={false}
            columns={this.columns}
            footer={this.tableFooter}
          />
          <FormModal
            title="组织机构"
            ModalContent={InputForm}
            actionSrc={
              {
                edit: "organization/organizationEdit",
                add: "organization/organizationAdd",
              }
            }
            detailData={editItem}
            submitFormat={this.formatInputData}
            items={this.formItems}
            onOk={this.modalOk}
            ref={ref => this.modalRef = ref}
          />
        </div>
      </div>
    );
  }
  formItems = [
    {
      title: "机构名称",
      name: "name",
    },
    {
      title: "备注",
      name: "remark",
    },
  ];

  componentDidMount() {
    this.getAllItem();
  }
  modalOk = () => {
    this.getAllItem();
  }
  /**
   * 获取所有组织机构
   * @returns {Promise<void>}
   */
  async getAllItem() {
    const {ecode,data,message:msg,} = await get('organization/organizationList');
    if (ecode) {
      message.error(msg);
    } else {
      this.setState({
        data: data,
      });
    }
  }
  formatInputData = (inputVal,) => {
    const {changeItem,} = this.state;
    if (changeItem && changeItem.isAdd) {
      return {
        ...inputVal,
        parentId: changeItem.id === undefined ? 0 : changeItem.id,
      };
    } else {
      return {
        ...changeItem,
        ...inputVal,
      };
    }
  };

  delConfirm = (row) => {
    modalRef = Modal.confirm({
      title: '删除确认',
      content: `删除${row.name}?`,
      okText: '确认',
      cancelText: '取消',
      destroyOnClose: true,
      onOk: () => {
        this.deleteRow(row);
      },
    });
  };
  deleteRow = async ({id,}) => {
    const {ecode,message:msg,} = await get(`organization/deleteOrganization/${id}`);
    if (ecode) {
      message.error(msg);
    } else {
      this.getAllItem();
    }
  }
  /**
   * 关闭弹窗
   */
  componentWillUnmount() {
    modalRef && modalRef.destroy();
  }
  /**
   * 打开弹窗
   * @param row
   * @param isAdd
   */
  openModal = (row = {}, isAdd = true) => {
    this.setState({
      editItem: isAdd ? {} : row,
      changeItem: {...row, isAdd,},
    }, () => {
      this.modalRef.show(isAdd);
    });
  }
  tableFooter = () => {
    return (
      <Button
        onClick={this.openModal}
      >
        新增节点
      </Button>
    );
  }
  columns = [
    {
      title: '机构名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 360,
      render: (text) => formatValue(text),
    },
    {
      title: '操作',
      key: 'action',
      width: 360,
      render: (text, record) => (
        <div className="common-table-action">
          <span
            onClick={() => {
              this.openModal(record, true);
            }}
          >
            添加子节点
          </span>
          <span
            onClick={() => {
              this.openModal(record, false);
            }}
          >
            编辑
          </span>
          <span
            className="del"
            onClick={() => {
              this.delConfirm(record);
            }}
          >
            删除
          </span>
        </div>
      ),
    },
  ];
}
