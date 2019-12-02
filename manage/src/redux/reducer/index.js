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
			return {
				...state,
				menuValue: action.menuValue
			};
		default:
			return {
				...initState
			};
	}
}