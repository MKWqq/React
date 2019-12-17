/* 可编辑table组件——基于antd组件 */
import React, {Component} from 'react';
import {Form, Table, Tag} from 'antd';

/* 模拟数据 */
const mockRespData = [
    {storeName: '春熙路', address: '春熙路110号', telephone: '15156278767', status: '0'},
    {storeName: '春熙路', address: '春熙路110号', telephone: '15156278767', status: '1'},
    {storeName: '春熙路', address: '春熙路110号', telephone: '15156278767', status: '1'},
    {storeName: '春熙路', address: '春熙路110号', telephone: '15156278767', status: '0'}
];

const data = [];

mockRespData.forEach((item, index) => {
    data.push(
        {
            key: index.toString(),
            storeName: item.storeName,
            address: item.address,
            telephone: item.telephone,
            status: item.status
        }
    );
});

const EditableContext = React.createContext({});

class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {title: '门店名', dataIndex: 'storeName', editable: true},
            {title: '地址', dataIndex: 'address', editable: true},
            {title: '联系电话', dataIndex: 'telephone', editable: true},
            {
                title: '配送状态', dataIndex: 'status', editable: true, render: (currentStatus, columnItem) => {
                    return (
                        <Tag
                            color={currentStatus === '0' ? 'volcano' : 'green'}>{currentStatus === '0' ? '停送' : '配送中'}</Tag>
                    );
                }
            },
            {
                title: '操作', dataIndex: 'operator', render: () => {
                    return (
                        <a>编辑</a>
                    );
                }
            }
        ];
    }

    cancel = () => {
    };

    render() {
        /* waiting */
        const components={};

        const columns = this.columns.map((col, index) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                /* 设置单元格属性 */
                onCell: (currentRowData) => {
                    // currentRowData为绑定row的数据
                    return {
                        ...currentRowData,
                        cellType: col.dataIndex === 'status' ? 'select' : 'input'
                    };
                }
            };
        });
        return (
            <EditableContext.Provider value={this.props.form}>
                <Table components={components} bordered dataSource={data} columns={columns} rowClassName='editable-row' pagination={
                    {onChange: () => this.cancel}
                }/>
            </EditableContext.Provider>
        );
    }
}

export default Form.create()(EditableTable);