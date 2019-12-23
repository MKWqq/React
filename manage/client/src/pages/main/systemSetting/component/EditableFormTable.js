/* 可编辑table组件——基于antd组件 */
import React, {Component} from 'react';
import {Form, Table, Input, Select, Popconfirm, Tag} from 'antd';
import './EditableFormTable.css'

const {Option} = Select;

/* 模拟数据 */
const mockRespData = [
	{storeName: '春熙路1', address: '春熙路110号', telephone: '15156278767', status: '0'},
	{storeName: '春熙路2', address: '春熙路110号', telephone: '15156278767', status: '1'},
	{storeName: '春熙路3', address: '春熙路110号', telephone: '15156278767', status: '1'},
	{storeName: '春熙路4', address: '春熙路110号', telephone: '15156278767', status: '0'}
];

const tableData = [];

mockRespData.forEach((item, index) => {
	tableData.push(
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
	/* 单元格渲染可编辑框类型
	* @params：select——下拉框，默认为input框
	*  */
	RenderMultipleTypeCell = () => {
		if (this.props.cellType === 'select') {
			return (
				<Select>
					<Option key='0'>停送</Option>
					<Option key='1'>配送中</Option>
				</Select>
			);
		} else {
			return <Input/>
		}
	};

	renderCell = ({getFieldDecorator}) => {
		/* otherProps为className值，其他参数为onCell函数返回对象定义的单元格属性值 */
		let {cellType, dataIndex, isEditing, children, currentRowData, ...otherProps} = this.props;
		return (
			<td {...otherProps}>
				<Form.Item>
					{isEditing ? getFieldDecorator(dataIndex, {
							rules: [{required: true, message: ''}],
							initialValue: currentRowData[dataIndex]
						})(this.RenderMultipleTypeCell())
						: (children)}
				</Form.Item>
			</td>
		);
	};

	render() {
		return (
			<EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
		);
	}
}

class EditableTable extends Component {
	constructor(props) {
		super(props);
		/* editingKey：正在编辑的rowKey */
		this.state = {tableData, editingKey: ''};
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
				title: '操作', dataIndex: 'operator', render: (currentValue, currentRow) => {
					let editing = this.isEditing(currentRow);
					return (
						editing ? (
							<span>
								<EditableContext.Consumer>
									{(form) => (
										<span className='text-button margin-right-10' onClick={() => this.save(form, currentRow.key)}>保存</span>)
									}
								</EditableContext.Consumer>
								<Popconfirm title='确认取消？' cancelText='取消' okText='确认' onConfirm={()=>{this.cancel(currentRow.key)}}>
									<span className='text-button'>取消</span>
								</Popconfirm>
							</span>
						) : (<span className='text-button' onClick={() => {
							this.edit(currentRow.key)
						}}>编辑</span>)
					);
				}
			}
		];
	}

	/* 单元格是否正在编辑 */
	isEditing = (currentRowData) => this.state.editingKey === currentRowData.key;

	edit(editingKey) {
		this.setState({
			editingKey
		});
	}

	save(form, currentRowKey) {
		let {validateFields} = form;
		/* currentChangeRowData为当前可编辑框的值集合 */
		validateFields((err, currentNewRowData) => {
			if (!err) {
				/* 发送请求 */
				/* 判断修改的行是否为以前存在的行。如果是则修改，否则添加新行 */
				let newData = [...this.state.tableData];
				let changeRowIndex = newData.findIndex(row => row.key === currentRowKey);
				if (changeRowIndex > -1) {
					/* 找到行，修改data值 */
					let oldRowData=newData[changeRowIndex]; // 保留行没有修改字段值
					newData.splice(changeRowIndex, 1, {...oldRowData,...currentNewRowData});
				} else {
					/* 未找到修改的行，新增行 */
					newData.push(currentNewRowData);
				}
				this.setState({
					editingKey: '',
					tableData: newData
				});
			}
		});
	}

	cancel = () => {
		this.setState({editingKey:''});
	};

	render() {
		/* waiting */
		const components = {
			body: {
				cell: EditableCell
			}
		};

		const columns = this.columns.map((col, index) => {
			if (!col.editable) {
				return col;
			}
			return {
				...col,
				/* 设置单元格属性 */
				onCell: (currentRowData) => {
					// currentRowData为绑定当前row的数据
					return {
						currentRowData,
						cellType: col.dataIndex === 'status' ? 'select' : 'input',
						dataIndex: col.dataIndex,// 用于输入框双向绑定key确认
						isEditing: this.isEditing(currentRowData),// 是否正在编辑
					};
				}
			};
		});
		/* pagination：点击分页配置 */
		return (
			<EditableContext.Provider value={this.props.form}>
				<Table components={components} bordered dataSource={this.state.tableData} columns={columns} rowClassName='editable-row'
				       pagination={
					       {onChange: () => this.cancel}
				       } />
			</EditableContext.Provider>
		);
	}
}

export default Form.create()(EditableTable);