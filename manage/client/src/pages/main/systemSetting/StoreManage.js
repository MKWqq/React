/**
 * 店面管理
 * */
import React from 'react'
import {Table,Tag,Input,InputNumber,Popconfirm,Form} from 'antd'
import EditableFormTable from './component/EditableFormTable'

export default class StoreManage extends React.Component{
	columns=[
		{
            key:'0',
            title:'店名',
            dataIndex:'storeName'
		},
		{
			key:'1',
			title:'地址',
			dataIndex:'address'
		},
		{
			key:'2',
			title:'联系电话',
			dataIndex:'telephone'
		},
		{
			key:'3',
			title:'状态',
			dataIndex:'status',
			render:(value)=>{
                return (
					<Tag color={value==='0'?'volcano':'green'} key='value'>{value==='0'?'停用':'有效'}</Tag>
				);
            }
		},
		{
			key:'4',
			title:'操作',
			dataIndex:'operator',
			render:()=>{
				return <a>编辑</a>
			}
		}
	];
	// status:0——停止，1——有效
	data=this.columns.map((item,index)=>{
		return {key:index.toString(),storeName:'春熙路',address:'春熙路110号',telephone:'15156278767',status:index.toString()}
	});
	render(){
		return (
			<div>
				<Table columns={this.columns} dataSource={this.data} />
				<EditableFormTable />
			</div>

		)
	}
};