/* 可编辑表格使用样例 */

/**
 * 菜单管理
 * @EditableFormTableBase之props：
 *  dataSource，控制表格数据渲染。每条数据必须含有唯一key。
 *      {
 *          key,
 *          columnKey,
 *      }
 *  baseColumns：控制表格列。dataIndex为唯一，则不需要指定key。
 *      {
 *          title,
 *          dataIndex,
 *          editable:true/false, //是否允许修改
 *          cellType:'', //可编辑元素类型，默认为text。与html相同
 *          selectData:[] //可编辑元素为select下拉框时，下拉框数据
 *      }
 *  operatorConfigArr：操作列配置
 *      [
 *          isDelete  //展示删除
 *      ]
 *  save(rowKey,newRowValue)：事件。数据编辑保存回调方法，更新父组件dataSource数据
 *      @params：
 *          rowKey：修改当前行key。
 *          newRowValue：当前行所有双向绑定编辑框新值集合
 *  deleteCB(record)事件：删除操作事件绑定
 * */
import React, {Component} from 'react'
import EditableFormTableBase from './EditableFormTableBase'
import selectAllData from '../../componentHttp/selectHttp'
import {Form,Tag} from 'antd'

/* 模拟数据 */
const mockRespData = [
	{menuName: '春熙路1', useStore: '0', prompt: '15156278767', status: '0'},// 0——停用 1——正在使用
	{menuName: '春熙路2', useStore: '0', prompt: '15156278767', status: '1'},
	{menuName: '春熙路3', useStore: '1', prompt: '15156278767', status: '2'},
	{menuName: '春熙路4', useStore: '1', prompt: '15156278767', status: '0'}
];

let dataSource = mockRespData.map((record, index) => {
	return {key: index, ...record};
});


class FoodMenuManage extends Component {
	constructor(props) {
		super(props);
		let baseColumns = [
			{title: '菜单名', dataIndex: 'menuName', editable: true,},
			{
				title: '使用门店',
				dataIndex: 'useStore',
				editable: true,
				cellType: 'select',
				selectData: selectAllData.storeData,
				render: (currentValue) => {
					let currentSelectRow = selectAllData.storeData.find(item => {
						return item.storeId === currentValue;
					});
					let renderText = currentSelectRow['storeName'];
					return (
						<span>{renderText}</span>
					);
				}
			},
			{
				title: '状态', dataIndex: 'status', editable: true, cellType: 'switch', render: (currentValue) => {
					return (
						<Tag color={currentValue==='0'?'volcano':'green'}>{currentValue==='0'?'停用':'使用中'}</Tag>
					);
				}
			},
			{title: '备注', dataIndex: 'prompt', editable: true, cellType: 'textarea'}
		];
		this.state = {dataSource, baseColumns, operatorConfig: {isDelete: true}}
	}

	/* todo 保存编辑 */
	editSave = (rowKey, newValue) => {
		let keyIndex = this.state.dataSource.findIndex(record => {
			return record.key === rowKey;
		});
		let newDataSource = [...this.state.dataSource];
		if (keyIndex > -1) {
			let oldRowData = newDataSource[keyIndex]; // 保留除修改外的其他数据
			newDataSource.splice(keyIndex, 1, Object.assign(oldRowData, newValue));
		} else {
			newDataSource.push(Object.assign(newValue, {key: rowKey}))
		}
		/* 触发数据更新 */
		this.setState({
			dataSource: newDataSource
		});
	};

	/* todo 删除 */
	deleteCB=(record)=>{
		console.log('删除', record);
	};

	render() {
		return (
			<EditableFormTableBase save={this.editSave} deleteCB={this.deleteCB} operatorConfigArr={['isDelete']}
			                       dataSource={this.state.dataSource} baseColumns={this.state.baseColumns}/>
		);
	}
}

export default Form.create()(FoodMenuManage);