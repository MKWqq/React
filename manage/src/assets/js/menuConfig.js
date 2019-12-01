/*
* 菜单配置，配置跳转路由
* */

let _baseUrl="/main";
export default [
	{
		title:"首页",
		path:`${_baseUrl}/MainPage`,
		key:"1",
		iconType:"appstore"
	},
	{
		title:"系统设置",
		path:``,
		key:"2",
		iconType:"appstore",
		children:[
			{
				title:"门店管理",
				path:`${_baseUrl}/StoreManage`,
				key:"3"
			},
			{
				title:"基础路由",
				path:`${_baseUrl}/setting`,
				key:"4"
			}
		]
	}
];