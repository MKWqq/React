/*
* 菜单配置
* */

export default [
	{
		title:"首页",
		path:"",
		key:"1",
		iconType:"appstore"
	},
	{
		title:"系统设置",
		path:"",
		key:"2",
		iconType:"appstore",
		children:[
			{
				title:"门店管理",
				path:"",
				key:"3"
			}
		]
	}
];