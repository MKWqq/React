/* 可编辑table组件——基于antd组件 */
import React, {Component} from 'react';
import {Form,Tag, Input, InputNumber, Popconfirm, Table} from 'antd';

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

class EditableCell extends Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };
    /* 可编辑input */
    renderCell = ({getFieldDecorator}) => {
        const {editing, dataIndex, title, inputType, record, index, children, ...restProps} = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{margin: 0}}>
                        {getFieldDecorator(dataIndex, {
                            rules: [],
                            initialValue: record[dataIndex]
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {data, editingKey: ''};
        this.columns = [
            {title: '门店名', dataIndex: 'storeName', editable: true},
            {title: '地址', dataIndex: 'address', editable: true},
            {title: '联系电话', dataIndex: 'telephone', editable: true},
            {
                title: '配送状态', dataIndex: 'status', editable: true, render: (text, record) => {
                    return <Tag color={text==='0'?'volcano':'green'}>{text==='0'?'停送':'配送'}</Tag>
                }
            },
            {
                title: '操作', dataIndex: 'operation', render: (text, record) => {
                    const {editingKey} = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
							<EditableContext.Consumer>
								{form => (
                                    <a onClick={() => this.save(form, record.key)} style={{marginRight: 8}}>
                                        保存
                                    </a>
                                )}
							</EditableContext.Consumer>
							<Popconfirm title='确认取消？' onClick={() => this.edit(record.key)}>
								<a>取消</a>
							</Popconfirm>
						</span>
                    ) : (
                        <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>编辑</a>
                    );
                }
            }
        ];
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({editingKey: ''});
    };

    save(form, key) {
        form.validateFields((err, row) => {
            if (err) {
                return false;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {...item, ...row});
                this.setState({data: newData, editingKey: ''});
            } else {
                newData.push(row);
                this.setState({data: newData, editingKey: ''});
            }
        });
    };

    edit(key) {
        this.setState({editingKey: key});
    }

    render() {
        const components = {
            body: {
                cell: EditableCell
            }
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record)
                })
            };
        });

        return (
            <EditableContext.Provider value={this.props.form}>
                <Table components={components} bordered dataSource={this.state.data} columns={columns}
                       rowClassName='editable-row' pagination={{
                    onChange: this.cancel
                }}/>
            </EditableContext.Provider>
        );
    }
}

export default Form.create({})(EditableTable);