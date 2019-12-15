/**
 * reducer，数据处理
 * */
import {type} from './../action'

/* 刷新初始化的值——sessionStorage、localStorage中取初始值；将信息存在数据库通过接口取初始值； */
const firstState = {
	/* 储存导航的key，用于有子路由时 */
	menuValue: {
		title:"",
		selectKey:"",
		selectKeyPath:[]
	}
};
const initState = sessionStorage.initState ? JSON.parse(sessionStorage.initState) : firstState;

/**
 * @params:
 * newState：为state变化部分组成的对象
 * */
function saveStateToSessionStorage(newState) {
	if (!window.sessionStorage) {
		console.log('不支持sessionStorage');
	} else {
		sessionStorage.initState = sessionStorage.initState
			? JSON.stringify(Object.assign(JSON.parse(sessionStorage.initState), newState))
			: JSON.stringify(Object.assign(initState,newState));
	}
}

export default (state = initState, action) => {
	switch (action.type) {
		case type.SwitchMenu:
			saveStateToSessionStorage({menuValue: action.menuValue});
			return Object.assign({...state},{menuValue: action.menuValue});
		case type.SaveLoginMessage:
			saveStateToSessionStorage({loginMessage:action.loginMessage});
		default:
			// 初始化state数据
			return {
				...state
			};
	}
}