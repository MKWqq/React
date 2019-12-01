/**
 * action，ui交互修改state的唯一入口
 * */
export const type={
    SwitchMenu:"SwitchMenu"
};

export function SwitchMenu(menu){
    return {
        type:type.SwitchMenu,
        menuValue:menu
    };
}