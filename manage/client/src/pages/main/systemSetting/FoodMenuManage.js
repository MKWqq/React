/**
 * 菜单管理
 * @state：
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
 *      }
 *  operatorConfigArr：操作列配置
 *      [
 *          isDelete  //展示删除
 *      ]
 * */
import React, {Component} from 'react'
import EditableFormTableBase from './component/EditableFormTableBase'
import {Form} from 'antd'

/* 模拟数据 */
const mockRespData = [
	{menuName: '春熙路1', useStore: '春熙路110号', prompt: '15156278767', status: '0'},// 0——停用 1——正在使用
	{menuName: '春熙路2', useStore: '春熙路110号', prompt: '15156278767', status: '1'},
	{menuName: '春熙路3', useStore: '春熙路110号', prompt: '15156278767', status: '2'},
	{menuName: '春熙路4', useStore: '春熙路110号', prompt: '15156278767', status: '0'}
];

let dataSource = mockRespData.map((record, index) => {
	return {...record, key: index.toString()};
});

let baseColumns = [
	{title: '菜单名', dataIndex: 'menuName', editable: true,},
	{title: '使用门店', dataIndex: 'useStore', editable: true,cellType:'select'},
	{title:'状态',dataIndex:'status',editable:true,cellType:'switch'},
	{title: '备注', dataIndex: 'prompt', editable: true,cellType:'textarea'}
];

class FoodMenuManage extends Component {
	constructor(props) {
		super(props);
		this.state = {dataSource,baseColumns,operatorConfig:{isDelete:true}}
	}

	render() {
		return (
			<EditableFormTableBase operatorConfigArr={['isDelete']} dataSource={this.state.dataSource} baseColumns={this.state.baseColumns}/>
		);
	}
}

export default Form.create()(FoodMenuManage);