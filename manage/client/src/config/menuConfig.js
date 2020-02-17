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
		title:'UI',
		path:`${_baseUrl}/UI`,
		key:`${_baseUrl}/UI`,
		children:[
            {
                title:'按钮',
                path:`${_baseUrl}/UI/Button`,
                key:`${_baseUrl}/UI/Button`
            },{
                title:'弹窗',
                path:`${_baseUrl}/UI/Alter`,
                key:`${_baseUrl}/UI/Alter`
            },{
                title:'Loading',
                path:`${_baseUrl}/UI/Loading`,
                key:`${_baseUrl}/UI/Loading`
            },{
                title:'通知提醒',
                path:`${_baseUrl}/UI/Notify`,
                key:`${_baseUrl}/UI/Notify`
            },{
                title:'全局Message',
                path:`${_baseUrl}/UI/Message`,
                key:`${_baseUrl}/UI/Message`
            },{
                title:'Tab页面',
                path:`${_baseUrl}/UI/Tab`,
                key:`${_baseUrl}/UI/Tab`
            },{
                title:'图片画廊',
                path:`${_baseUrl}/UI/Picture`,
                key:`${_baseUrl}/UI/Picture`
            },{
                title:'轮播图',
                path:`${_baseUrl}/UI/Carousel`,
                key:`${_baseUrl}/UI/Carousel`
            },
		]
	},
	{
		title:'表单',
		path:`${_baseUrl}/form`,
		key:`${_baseUrl}/form`,
		children:[
			{
				title:'登录',
				path:`${_baseUrl}/form/login`,
				key:`${_baseUrl}/form/login`,
			},{
				title:'注册',
				path:`${_baseUrl}/form/register`,
				key:`${_baseUrl}/form/register`,
			}
		]
	},
	{
		title:'表格',
		path:`${_baseUrl}/table`,
		key:`${_baseUrl}/table`,
		children:[
			{
				title:'基础表格',
				path:`${_baseUrl}/form/basicTable`,
				key:`${_baseUrl}/form/basicTable`,
			},{
				title:'高级表格',
				path:`${_baseUrl}/form/highTable`,
				key:`${_baseUrl}/form/highTable`,
			}
		]
	},
    {
        title: '富文本',
		path:`${_baseUrl}/rich`,
		key:`${_baseUrl}/rich`,
    },
	{
        title: '图标',
        path: `${_baseUrl}/charts`,
        key: `${_baseUrl}/charts`,
        children: [
            {
                title: '柱形图',
                path: `${_baseUrl}/charts/bar`,
                key: `${_baseUrl}/charts/bar`,
            },
            {
                title: '饼图',
                path: `${_baseUrl}/charts/pie`,
                key: `${_baseUrl}/charts/pie`,
            },
            {
                title: '折线图',
                path: `${_baseUrl}/charts/line`,
                key: `${_baseUrl}/charts/line`,
            },
        ]
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