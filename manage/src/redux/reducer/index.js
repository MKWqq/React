/**
 * reducer，数据处理
 * */
import { type } from './../action'

const initState={
    menuValue:""
};

export default(state=initState,action)=>{
    switch (action.type) {
        case type.SwitchMenu:
            return {
                ...state,
                menuValue:action.menuValue
            };
            break;
        default:
            break;
    }
}