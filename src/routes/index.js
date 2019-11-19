import {formatRouters,} from "../util/index";
import Page from "../app/system/empty";
import OrganizationList from "../app/system/organization/organization";
import CommonUserList from "../app/system/common-user/user-list";
import CommonUserEdit from "../app/system/common-user/user-edit";
import CommonUserAdd from "../app/system/common-user/user-add";
import CommonUserDetail from "../app/system/common-user/detail";
import SystemUser from "../app/system/system-user/user-list";

const Routers = [
  {
    path: "/systemSetting",
    title: "系统设置",
    showMenu: true,
    icon: "icon-yanzhengmatianchong",
    children: [
      {
        path: "/systemSetting/organization",
        title: "组织机构",
        showMenu: true,
        icon: "icon-yanzhengmatianchong",
        component: Page,
        children: [
          {
            path: "/systemSetting/organization/organizationList",
            title: "组织机构列表",
            showMenu: true,
            icon: "gongzuotai",
            component: OrganizationList,
          },
        ],
      },
      {
        path: "/systemSetting/userList",
        title: "用户总列表",
        showMenu: true,
        icon: "gongzuotai",
        component: Page,
        children: [
          {
            path: "/systemSetting/userList/systemUser",
            key: "systemUser",
            title: "系统用户",
            showMenu: true,
            component: SystemUser,
          },
          {
            path: "/systemSetting/userList/commonUser",
            title: "普通用户",
            showMenu: true,
            icon: "gongzuotai",
            component: CommonUserList,
            children: [
              {
                path: "/systemSetting/userList/commonUser/commonUserDetail/:id",
                key: "systemUserDetail",
                title: "用户详情",
                showMenu: false,
                icon: "gongzuotai",
                component: CommonUserDetail,
              },
              {
                path: "/systemSetting/userList/commonUser/commonUserEdit/:id",
                title: "编辑用户",
                showMenu: false,
                icon: "gongzuotai",
                component: CommonUserEdit,
              },
              {
                path: "/systemSetting/userList/commonUser/commonUserAdd",
                title: "新增用户",
                showMenu: false,
                icon: "gongzuotai",
                component: CommonUserAdd,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/menu1",
    title: "一级菜单1",
    showMenu: true,
    icon: "gongzuotai",
    children: [
      {
        path: "/menu1/menu11",
        title: "一级菜单1",
        showMenu: true,
        icon: "gongzuotai",
        component: Page,
        children: [
          {
            path: "/menu1/menu11/menu111",
            title: "一级菜单11",
            showMenu: true,
            icon: "gongzuotai",
            component: Page,
            children: [],
          },
        ],
      },
    ],
  },
  {
    path: "/menu2",
    title: "一级菜单2",
    showMenu: true,
    icon: "gongzuotai",
    children: [
      {
        path: "/menu2/menu22",
        title: "一级菜单2",
        showMenu: true,
        icon: "gongzuotai",
        component: Page,
        children: [],
      },
    ],
  },
];

export default formatRouters(Routers);
