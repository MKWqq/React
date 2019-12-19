/* 可编辑表格基础文件 */
/**
 * @props：
 *  dataSource：表格渲染需要的数据
 *  baseColumns：可编辑表格列配置，基础列信息。不含操作列
 *  operatorConfigArr：操作列配置。除编辑外的所有操作按钮
 *      [
 *          isDelete  //展示删除
 *      ]
 * */

import React, {Component} from 'react'
import {Table, Form} from 'antd'

/* 操作列映射关系 */
const operatorConfigRelation = {
	isDelete: {name: '删除'}
};

class EditableCell extends Component{
	render(){
		console.log(this.props);
		let {cellType,children,record,dataIndex,...classNameAndThingsProps}=this.props;
		return (
			<td>123</td>
		);
	}
}

class EditableFormTableBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			/* 渲染列处理 */
			renderColumns: this.props.baseColumns
		};
	}

	/* 根据父组件baseColumns拓展columns配置，并加操作列 */
	handleColumnConfig() {
		let {baseColumns = [], operatorConfigArr = []} = this.props;
		/* 加操作列 */
		let _operatorColumn = {
			title: '操作',
			dataIndex: 'operator',
			render: () => {
				if (operatorConfigArr && operatorConfigArr.length) {
					/* 除编辑外，还有其他操作按钮 */
					return (
						<span>
							<a>编辑</a>
							{operatorConfigArr.map(item => (
								<a className='margin-left-10'>{operatorConfigRelation[item]['name']}</a>
							))}
						</span>
					);
				} else {
					return (
						<a>编辑</a>
					);
				}
			}
		};
		baseColumns.push(_operatorColumn);
		return baseColumns.map(col => {
			if (!col.editable) {
				return col;
			}
			return {
				...col,// 列配置信息
				onCell: (record) => ({ //返回对象为单元格属性
					record,// 行数据信息，用于自定义单元格展示默认数据
					cellType: col.cellType ? col.cellType : 'text',// 可编辑单元格元素类型
					dataIndex: col.dataIndex,// 单元格数据key，用于调用默认数据
				})
			};
		});
	}

	render() {
		let renderColumns=this.handleColumnConfig();// 确保传递给自定义单元格子组件接受的props是最新的
		let components={
			body:{
				cell:EditableCell
			}
		};
		return (
			<Table components={components} bordered dataSource={this.props.dataSource} columns={renderColumns}/>
		)
	}
}

export default Form.create()(EditableFormTableBase);