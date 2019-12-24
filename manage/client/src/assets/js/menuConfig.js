/*
* 菜单配置，配置跳转路由
* */

let _baseUrl="/main";
export default [
	{
		title:"首页",
		path:`${_baseUrl}/MainPage`,
		key:`${_baseUrl}/MainPage`,
		iconType:"appstore"
	},
	{
		title:'门店',
		path:`${_baseUrl}/Store`,
		key:`${_baseUrl}/Store`,
		iconType:'appstore',
		children:[
			{
				title:'春熙路串串店',
				path:`${_baseUrl}/Store/StoreTemplate`,
				key:`${_baseUrl}/Store/StoreTemplate`,
			}
		]
	},
	{
		title:'表单元素API',
		path:`${_baseUrl}/FormElementAPI`,
		key:`${_baseUrl}/FormElementAPI`,
		iconType:'appstore',
		children:[
			{
				title:'时间选择器',
				path:`${_baseUrl}/FormElementAPI/DatePicker`,
				key:`${_baseUrl}/FormElementAPI/DatePicker`
			}
		]
	},
	{
		title:"系统设置",
		path:`${_baseUrl}/setting`,
		key:`${_baseUrl}/setting`,
		iconType:"appstore",
		children:[
			{
				title:"门店管理",
				path:`${_baseUrl}/StoreManage`,
				key:`${_baseUrl}/StoreManage`
			},
			{
				title:'菜单管理',
				path:`${_baseUrl}/FoodMenuManage`,
				key:`${_baseUrl}/FoodMenuManage`,
			}
		]
	}
];