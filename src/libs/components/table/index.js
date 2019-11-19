/*
 * @Author: qwang
 * @Date: 2018-08-03 16:16:20
 * @Last Modified by: qwang
 * @Last Modified time: 2018-08-03 16:25:48
 * @Desc: 表格
 */
import React, {PureComponent} from "react";
import {Table, message, Button, Modal} from "antd";
import PropTypes from "prop-types";
import {post, get} from '../../api/index';
import {formatValue, formatTimeVal, formatNumVal} from "../../../util";

let modalRef;
export default class CommonTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      number: 0,
      size: 10,
      total: 0,
      url: '', // 接受父级组件的url, fetch数据的接口
      params: {}, // 父组件的参数, 会合并到fetch数据的请求参数中
      items: []
    }
  }
  render() {
    const {loading, number, size, total, items = []} = this.state;
    const {showPage, showIndex} = this.props;
    const tableColumns = this.generateColumn();
    const paginationEl = showPage
      ? {
        current: number + 1,
        pageSize: size,
        total,
        showTotal: total => `共 ${total} 条`,
        pageSizeOptions: [
          '10', '20', '40'
        ],
        showQuickJumper: true,
        size: 'small',
        showSizeChanger: true,
        onChange: this.changePage,
        onShowSizeChange: this.changePageSize
      }
      : false;
    return (<Table
      rowKey={(record, index) => record.id || index}
      dataSource={items}
      columns={showIndex
      ? [
        this.getIndex(),
        ...tableColumns
      ]
      : tableColumns}
      loading={loading}
      pagination={paginationEl}/>);
  }
  /**
  * 分页跳转
  * @param number
  * @param pageSize
  */
  changePage = (number, pageSize,) => {
    const {search} = this.props;
    this.setState({
      number: number - 1,
      size: pageSize
    }, this.fetchData);
  };
  /**
   * pageSize改变
   * @param current
   * @param size
   */
  changePageSize = (current, size) => {
    const {search} = this.props;
    this.setState({
      number: 0,
      size: size
    }, this.fetchData);
  };
  componentDidMount() {
    const {params, url} = this.props;
    this.setState({
      url,
      params,
    }, this.fetchData);
  }
  /**
   * 获取表格数据
   */
  fetchData = async() => {
    const {number, size, params, url} = this.state;
    this.setState({loading: true});
    const {ecode, data, message: msg} = await post(url, Object.assign({}, {
      number,
      size
    }, params));
    if (ecode) {
      this.setState({
        loading: false
      }, () => {
        message.error(msg);
      });
    } else {
      let items = _.get(data, 'content', []);
      let total = _.get(data, 'totalElements', 0);
      if (data instanceof Array) {
        items = data || [];
        total = data.length;
      }
      this.setState({
        loading: false,
        total: total,
        items: items,
      });
    }
  }
  /**
   * 重置
   */
  resetParams = () => {
    this.setState({
      number: 0
    }, () => {
      this.fetchData();
    });
  }
  /**
   * 删除过后刷新页面
   */
  delThenRefresh = () => {
    const {items, number} = this.state;
    this.setState({
      number: items.length === 1
        ? Math.max(0, number - 1)
        : number
    }, () => {
      this.fetchData();
    });
  }
  /**
   * 添加序号
   * @returns {{key: string, title: string, dataIndex: string, align: string, render: function(*, *, *): *}}
   */
  getIndex = () => {
    const {number, size} = this.state;
    return {
      key: "index",
      title: '序号',
      dataIndex: 'index',
      align: 'left',
      render: (text, record, index) => {
        return size * number + index + 1;
      }
    };
  }
  /**
   * 删除弹框确认
   * @param item
   */
  delConfirm(item) {
    const {delTipKey,} = this.props;
    modalRef = Modal.confirm({
      title: '删除确认',
      content: `删除${item[delTipKey]}?`,
      okText: '确认',
      cancelText: '取消',
      destroyOnClose: true,
      onOk: () => {
        this.deleteRow(item);
      },
    });
  }
  /**
   * 关闭弹窗
   */
  componentWillUnmount() {
    modalRef && modalRef.destroy();
  }
  deleteRow({id}) {
    const {deleteUrl} = this.props;

    get(`${deleteUrl}/${id}`).then(({ecode, message: msg}) => {
      if (ecode !== 0) {
        message.error(msg || '删除失败');
      } else {
        this.fetchData();
      }
    }).catch(() => {
      message.error('删除失败');
    });
  }

  // 生成tableColumns
  generateColumn() {
    const {columns, deleteUrl, deleteBtnVisible} = this.props;
    const generateRenderFunc = type => {
      return text => {
        const acceptedTypes = {
          'value': formatValue,
          'number': formatNumVal,
          'time': formatTimeVal
        };
        if (-1 === Object.keys(acceptedTypes).indexOf(type)) {
          console.warn('unknown type of column');
          return formatValue(text);
        }
        return acceptedTypes[type](text);
      };
    };
    const generateCtrlBtns = ({btns}) => (_, row, rowIdx) => {
      let ctrlBtns = btns.map(btn => {
        const disa = btn.disabled;
        let text = typeof btn.text === 'function' ? btn.text(row) : btn.text;
        let disabled = false;
        switch(typeof disa){
          case 'boolean':
            if(disa){
              disabled = true;
            }
            break;
          case 'function':
            disabled = disa(row);
            break;
          default:
            break;
        }
        return <span
          key={text + rowIdx}
          style={btn.style}
          className={disabled?'disabled':''}
          onClick={() => {
          btn.onClick(row, rowIdx);
        }}>
          {text}
        </span>
      });
      if(deleteUrl){
        let deleteBtn = null;
        if(
          typeof deleteBtnVisible === 'function' && deleteBtnVisible(row, rowIdx) ||
          typeof deleteBtnVisible !== 'function' && deleteBtnVisible
        ){
          deleteBtn = <span
            key={'delete-btn'}
            className="del"
            onClick={() => {
            this.delConfirm(row);
          }}>
            删除
          </span>
        }
        deleteBtn && ctrlBtns.push(deleteBtn);
      }
      return <div className="common-table-action">
        {
          ctrlBtns
        }
      </div>
    }

    return columns.map(col => {
      switch (typeof col) {
        case 'string':
          {
            const [key = '',
              title = '',
              type = 'value',
              align = 'left'] = col.split('|');
            if (!key || !title) {
              console.warn(`key or title is required`);
            }
            return {key, title, align, dataIndex: key, render: generateRenderFunc(type)};
          }
        case 'object':
          {
            let render;
            if (typeof col.render === 'function') {
              render = col.render;
            } else if (Array.isArray(col.btns)) {
              render = generateCtrlBtns(col);
            } else {
              render = generateRenderFunc(col.type);
            }
            return {
              ...Object.assign({}, col, {
                title: col.title || '操作',
                align: col.align || 'left',
                dataIndex: col.dataIndex || col.key
              }),
              render
            };
          }
        default:
          console.error('empty column data');
          return {};
      }
    });
  }

  componentDidUpdate({params}){
    const {params:lastParams} = this.state;
    if(!_.isEqual(params, lastParams)){
      this.fetchData();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      url: nextProps.url,
      params: {
        ...nextProps.params
      }
    }
  }
}

CommonTable.propTypes = {
  url: PropTypes.string.isRequired, // 表格获取数据url
  deleteUrl: PropTypes.string, // 删除行数据url
  params: PropTypes.object, // 额外的搜索参数
  columns: PropTypes.array.isRequired, // 表头配置
  showPage: PropTypes.bool, // 是否显示分页
  showIndex: PropTypes.bool, // 是否显示分页
  delTipKey: PropTypes.string, // 删除提示选择的key
  deleteBtnVisible: PropTypes.any // delete按钮显示隐藏
};

CommonTable.defaultProps = {
  showPage: true,
  showIndex: false,
  deleteUrl: '',
  params: {},
  delTipKey: "name",
  deleteBtnVisible: true
};
