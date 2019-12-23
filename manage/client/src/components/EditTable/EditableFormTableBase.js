/* 可编辑表格基础文件。展示数据，抛出修改后的值 */
/**
 * 渲染功能封装。数据更改由父组件实现
 * @props：
 *  dataSource：表格渲染需要的数据
 *  baseColumns：可编辑表格列配置，基础列信息。不含操作列
 *  operatorConfigArr：操作列配置。除编辑外的所有操作按钮
 *      [
 *          isDelete  //展示删除
 *      ]
 *  save(rowKey,newRowValue)：事件。数据编辑保存回调方法，更新父组件dataSource数据
 *      @params：
 *          rowKey：修改当前行key。
 *          newRowValue：当前行所有双向绑定编辑框新值集合
 *  deleteCB(record)事件：删除操作事件绑定
 * */

import React, {Component} from 'react';
import {Form, Input, Select, Table, Popconfirm} from 'antd/lib/index';
import SwitchComponent from 'components/Editable/Switch';
import {operatorConfigRelation} from './EditTableConfig'
const {TextArea} = Input;
const {Option} = Select;

const EditableContext = React.createContext({});

// TODO 单元格渲染
class EditableCell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			useStatusValue: ''
		}
	}

	// todo Switch change事件数据返回
	switchChange(newValue) {
		this.setState({
			useStatusValue: newValue
		});
	}

	// 可编辑控件选择性渲染
	renderEditCell() {
		let {cellType, selectData} = this.props;
		if (cellType === 'select') {
			return (
				<Select>
					{selectData.map(item => {
						return <Option key={item.storeId}>{item.storeName}</Option>
					})}
				</Select>
			);
		} else if (cellType === 'textarea') {
			return (
				<TextArea/>
			);
		} else if (cellType === 'switch') {
			return (
				<SwitchComponent onChange={(newValue) => this.switchChange(newValue)} checkedChildren='启用'
				                 unCheckedChildren='停用'/>
			);
		} else {
			return (
				<Input/>
			);
		}
	}

	// todo 渲染单元格组件
	renderCell = ({getFieldDecorator}) => {
		let {cellType, isEditing, selectData, children, record, dataIndex, ...classNameAndThingsProps} = this.props;
		return (
			<td {...classNameAndThingsProps}>
				<Form.Item>
					{isEditing ? getFieldDecorator(dataIndex, {
							rules: [
								{required: true, message: ''}
							],
							initialValue: record[dataIndex],
							valuePropName: cellType === 'switch' ? 'checked' : 'value'
						})(this.renderEditCell()) :
						(children)}
				</Form.Item>
			</td>
		);
	};

	render() {
		return (
			<EditableContext.Consumer>
				{this.renderCell}
			</EditableContext.Consumer>
		);
	}
}

// TODO table基本配置
class EditableFormTableBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			/* 渲染列处理 */
			renderColumns: this.handleColumnConfig(),// 渲染列
			editingKey: '', // 正在编辑行的key
		};
	}

	// todo 表格数据渲染数据处理
	/* 编辑按钮切换 */
	renderEditOperator(record) {
		if (this.isEditing(record.key)) {
			return (
				<span>
					<EditableContext.Consumer>
						{(form) => (
							<span role='button' className='text-button margin-right-10'
							      onClick={() => this.saveEdit(form, record.key)}>保存</span>
						)}
					</EditableContext.Consumer>
					<Popconfirm title='确认取消？' onConfirm={() => this.cancelEdit()} cancelText='取消' confirmText='确认'>
						<span role='button' className='text-button'>取消</span>
					</Popconfirm>
				</span>
			);
		} else {
			return (
				<EditableContext.Consumer>
					{(form) => (
						<span role='button' className='text-button' onClick={() => this.editClick(record.key)}>编辑</span>
					)}
				</EditableContext.Consumer>
			);
		}
	}

	/* 根据父组件baseColumns拓展columns配置，并加操作列 */
	handleColumnConfig() {
		let {baseColumns = [], operatorConfigArr = []} = this.props;
		/* 加操作列 */
		let _operatorColumn = {
			title: '操作',
			dataIndex: 'operator',
			render: (currentValue, record) => {
				if (operatorConfigArr && operatorConfigArr.length) {
					/* 除编辑外，还有其他操作按钮 */
					return (
						<span>
							{this.renderEditOperator(record)}
							{operatorConfigArr.map((item, index) => (
								<span role='button' key={index}
								      onClick={() => this.props[operatorConfigRelation[item]['callback']](record)}
								      style={operatorConfigRelation[item]['style']}
								      className={`${operatorConfigRelation[item]['className']} text-button margin-left-10`}>{operatorConfigRelation[item]['name']}</span>
							))}
						</span>
					);
				} else {
					return this.renderEditOperator(record);
				}
			}
		};
		baseColumns.push(_operatorColumn);
		return this.handlerCellComponentProps(baseColumns);
	}

	/* 实时更新属性值【可编辑框默认值】到子组件 */
	handlerCellComponentProps(columns) {
		return columns.map(col => {
			if (!col.editable) {
				// 不能编辑列。返回默认配置列信息即可
				return col;
			}
			return {
				...col,
				onCell: record => ({// 返回对象为单元格自定义属性
					record,// 行数据信息，用于自定义单元格展示默认数据
					dataIndex: col.dataIndex,// 可编辑单元格元素类型
					cellType: col.cellType || 'text',// 单元格数据key，用于调用默认数据
					selectData: col.selectData || [], //下拉框数据
					isEditing: this.isEditing(record.key),// 是否正在编辑
				})
			}
		});
	}

	/* todo 编辑相关功能 */
	isEditing = (key) => (key === this.state.editingKey);

	// todo 点击编辑
	editClick(key) {
		this.setState({
			editingKey: key
		});
	}

	// todo 取消编辑
	cancelEdit() {
		this.setState({
			editingKey: ''
		})
	}

	// todo 保存编辑
	saveEdit(form, rowKey) {
		let {validateFields} = form;
		validateFields((err, values) => {
			if (err) {
				return false;
			} else {
				if (this.props.save) {
					this.props.save(rowKey, values);
					this.setState({
						editingKey: ''
					});
				} else {
					throw new Error('缺失保存数据方法！');
				}
			}
		});
	}

	render() {
		// 确保传递给自定义单元格子组件接受的props是最新的
		let renderColumns = this.handlerCellComponentProps(this.state.renderColumns);
		let components = {
			body: {
				cell: EditableCell
			}
		};
		return (
			<EditableContext.Provider value={this.props.form}>
				<Table components={components} bordered dataSource={this.props.dataSource} columns={renderColumns}/>
			</EditableContext.Provider>
		);
	}
}

export default Form.create()(EditableFormTableBase);