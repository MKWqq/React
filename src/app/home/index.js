import React, {Component,} from "react";
import { Layout, Menu, Breadcrumb, Icon,Dropdown,} from 'antd';
import {Provider,observer,} from 'mobx-react';
import {withRouter, Link,Switch,Route,} from "react-router-dom";
import Cookies from "js-cookie";
import { CopyRight, SystemName,} from "../../util/const";
import MenuItems from "../../routes/index";
import UserInfo from "../../store/user-info";
import Config from "../../config";
import './home.less';



let Crumb = [];

@withRouter
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topSelected: [],
      openKey: [],
      selectKey: [],
      crumb: [],
    };
  }
  static findItem(items = [],pathArr,index,max) {
    items.forEach(z => {
      const x = z.key === pathArr[index];
      if (x && index < max) {
        Crumb.push(z);
        Home.findItem(z.children, pathArr,++index,max);
      }
    });
  }
  static getDerivedStateFromProps(newProps,newState) {
    const currentPath = _.get(newProps, ['location', 'pathname',]);
    const pathArr = currentPath.replace(/\//,'').replace(/\/\d+/g,'').split("/");
    Crumb = [];
    Home.findItem(MenuItems,pathArr,0,pathArr.length);
    const Items = Crumb.filter(z => z.showMenu !== false);
    let topSelected = [],openKey = [],selectKey = [];
    if (Config.Layout.ShowFirstLevelAtTop) {
      topSelected = [Items[0].key,];
      selectKey = Items[Items.length - 1] ? [Items[Items.length - 1].key,] : [];
      openKey = Items.filter(z => z.key !== selectKey[0] || z.key !== topSelected[0]).map(z => z.key);
    } else {
      selectKey = Items[Items.length - 1] ? [Items[Items.length - 1].key,] : [];
      openKey = Items.filter(z => z.key !== selectKey[0]).map(z => z.key);
    }
    const defaultParams = {
      topSelected,
      openKey: newState.openKey.length ? newState.openKey : _.union(openKey,newState.openKey),
      selectKey,
    };
    return {
      crumb: Crumb,
      ...defaultParams,
    };
  }
  signOut = () => {
    const {history,} = this.props;
    Cookies.remove("SystemToken");
    sessionStorage.clear();
    history.push({
      pathname: '/login',
    });
  };
  topMenuClick = ({key,}) => {
    switch (key) {
      case "signOut":
        this.signOut();
        break;
      default:
        console.warn(key);
    }
  };
  menu = (
    <Menu onClick={this.topMenuClick}>
      <Menu.Item key="signOut">
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  renderTopMenu = () => {
    const {topSelected,} = this.state;
    if (Config.Layout.ShowFirstLevelAtTop) {
      return (
        <Menu
          mode="horizontal"
          className="layout-top-header"
          selectedKeys={topSelected}
          onSelect={this.selectTopMenu}
        >
          {
            MenuItems.map(z => {
              const isImg = /\.[png|jpg|jpeg]/i.test(z.icon);
              return (
                <Menu.Item key={z.key}>
                  {
                    isImg ? <img src={z.icon} /> : <span className={`iconfont icon-${z.icon}`} />
                  }
                  <p>{z.title}</p>
                </Menu.Item>
              );
            })
          }
        </Menu>
      );
    } else {
      return <div />;
    }
  };
  renderLeftMenu = () => {
    const {topSelected,} = this.state;
    if (Config.Layout.ShowFirstLevelAtTop) {
      const leftMenu = MenuItems.find(z => topSelected.indexOf(z.key) > -1);
      return this.renderMenuItem(leftMenu.children);
    } else {
      return this.renderMenuItem(MenuItems);
    }
  };
  renderMenuItem = (items) => {
    return items.map(z => {
      if (!z.showMenu) {
        return null;
      }
      if (z.children && z.children.length && z.children.filter(z =>z.showMenu !== false).length) {
        const isImg = /\.[png|jpg|jpeg]/i.test(z.icon);
        return (
          <Menu.SubMenu
            key={z.key}
            title={
              <span>
                {
                  isImg ? <img src={z.icon} /> : <span className={`iconfont ${z.icon}`} />
                }
                {z.title}
              </span>
            }
          >
            {
              this.renderMenuItem(z.children)
            }
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={z.key}
          >
            <Link to={z.path} >{z.title}</Link>
          </Menu.Item>
        );
      }
    });
  }
  render() {
    const {openKey,selectKey,crumb,} = this.state;
    return (
      <Provider
        UserInfo={UserInfo}
      >
        <Layout>
          <Layout.Header className="layout-header">
            <div className="logo">
              <img src={require("../../assets/img/logo.png")} />
              <span className="system-name">{SystemName}</span>
            </div>
            {
              this.renderTopMenu()
            }
            <div className="userInfo">
              <Dropdown overlay={this.menu}>
                <a
                  className="ant-dropdown-link"
                  href="#"
                >
                  {UserInfo.UserInfo.userName} <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Layout.Header>
          <Layout className="layout-content">
            <Layout.Sider
              className={`layout-left-menu-box ${Config.Layout.ShadowMode ? 'layout-left-menu-box-shadow': ''}`}
              width="2.6rem"
            >
              <Menu
                mode={Config.Layout.MenuMode}
                id="layout-left-menu"
                selectedKeys={selectKey}
                openKeys={openKey}
                onSelect={this.selectLeftMenu}
                onOpenChange={this.openMenu}
                style={{ height: '100%', borderRight: 0, }}
              >
                {
                  this.renderLeftMenu()
                }
              </Menu>
            </Layout.Sider>
            <Layout className={`layout-right-content-box ${Config.Layout.ShadowMode ? 'layout-right-content-box-shadow' : ''}`}>
              <Breadcrumb style={{ margin: '16px 0',}}>
                {
                  crumb.map((z,i) => {
                    return (
                      <Breadcrumb.Item key={z.key}>
                        {
                          (z.component && i < crumb.length - 1) ? <Link to={z.path}>{z.title}</Link> : z.title
                        }
                      </Breadcrumb.Item>
                    );
                  })
                }
              </Breadcrumb>
              <Layout.Content
                className={`layout-right-content ${Config.Layout.ShadowMode ? 'layout-right-content-shadow' : ''}`}
              >
                <Switch>
                  {
                    this.createRoute(MenuItems)
                  }
                </Switch>
              </Layout.Content>
              <Layout.Footer className="layout-footer">
                <p>{CopyRight}</p>
              </Layout.Footer>
            </Layout>
          </Layout>
        </Layout>
      </Provider>
    );
  }

  /**
   * 初始化菜单， 默认展开第一级 选中第一项
   * @returns {*}
   */
  selectLeftMenu = (item) => {
    const selectKey = [item.key,];
    this.setState({
      selectKey,
    });
  };
  selectTopMenu = (item) => {
    const topSelected = [item.key,];
    this.setState({
      topSelected,
    });
  };
  openMenu = (openKey) => {
    this.setState({
      openKey,
    });
  };
  createRoute = (routes) => {
    return routes.map(({path, component, children,key,}) => {
      let routes = [];
      if (children) {
        routes = routes.concat(this.createRoute(children));
      }
      if (component) {
        routes = routes.concat(
          <Route
            exact
            key={key}
            path={path}
            component={component}
          />
        );
      }
      return routes;
    });
  }
}
