/**
 * action，ui交互修改state的唯一入口
 * */
export const type={
    SwitchMenu:"SwitchMenu",
    SaveLoginMessage:"SaveLoginMessage"
};

// 导航信息保存
export function SwitchMenu(menu){
    return {
        type:type.SwitchMenu,
        menuValue:menu
    };
}

// 登录信息保存
export function saveLoginMessage(login){
    return {
        type:type.SaveLoginMessage,
        loginMessage:login
    };
}
