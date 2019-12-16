/**
 * 店面管理
 * */
import React from 'react'
import {Table,Tag,Input,InputNumber,Popconfirm,Form} from 'antd'

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
                console.log(value);
                return (
					<Tag color={value==='0'?'volcano':'green'} key='value'>{value==='0'?'停用':'有效'}</Tag>
				);
            }
		},
		{
			key:'4',
			title:'操作',
			dataIndex:'operator',
			render:(value)=>{}
		}
	];
	// status:0——停止，1——有效
	data=[
		{key:'1',storeName:'春熙路',address:'春熙路110号',telephone:'15156278767',status:'0'},
		{key:'2',storeName:'春熙路2',address:'春熙路1190号',telephone:'15156278707',status:'1'}
	];
	render(){
		return (
			<Table columns={this.columns} dataSource={this.data} />
		)
	}
};