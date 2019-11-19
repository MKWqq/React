import React, {PureComponent,} from "react";
import {Modal,message,} from 'antd';
import PropTypes from "prop-types";
import { get, post } from "../../../libs/api/index";
import CreateForm from "../../../libs/components/create-form/index";
import "./index.less";
import { isString } from "../../../util";

const formItemLayout = {
  labelCol: {
    xs: { span: 6, },
    sm: { span: 6, },
  },
  wrapperCol: {
    xs: { span: 6, },
    sm: { span: 16, },
  },
};

export default class CommonModal extends PureComponent {
  state = {
    show: false,
    loading: false,
    isAdd: false,
  };
  render() {
    const {show, loading,isAdd,} = this.state;
    const {title,className,cancelText,okText,items,detailData,} = this.props;
    const prefixTitle = !isAdd ? `编辑${title}` : `新增${title}`;
    return (
      <Modal
        destroyOnClose
        title={prefixTitle}
        visible={show}
        wrapClassName={classnames('common-modal', className)}
        onCancel={this.onCancel}
        cancelText={cancelText}
        confirmLoading={loading}
        okText={okText}
        onOk={this.onOk}
      >
        <div className="modal-box">
          <CreateForm
            formItemLayout={formItemLayout}
            items={items}
            type={isAdd ? 'add' : 'edit'}
            detailData={isAdd ? {} : detailData}
            ref={ref => this.modalContentRef = ref}
            wrappedComponentRef={ref => this.modalContentWrappedRef = ref}
          />
        </div>
      </Modal>
    );
  }
  componentDidMount() {
  }
  hide =() => {
    this.setState({
      show: false,
    });
  };
  show = (isAdd = false) => {
    console.log("isAdd",isAdd);
    this.setState({
      show: true,
      isAdd,
    });
  };
  onOk = () => {
    this.modalContentRef.validateFields((err,val) => {
      if (!err) {
        this.submitData(val);
      }
    })
  };
  async submitData(val) {
    const {actionSrc,onOk,submitFormat,} = this.props;
    const {loading,isAdd,} = this.state;
    const detailInfo = this.modalContentWrappedRef.getDetailInfo();
    if(loading){
      return ;
    }
    if (!actionSrc) {
      this.hide();
      onOk && onOk(val);
      return;
    }
    const url = isAdd ? actionSrc.add: actionSrc.edit;
    let params = {};
    if (submitFormat) {
      params = submitFormat(val, detailInfo);
    }
    if ((isAdd && detailInfo.id)) {
      params.id = detailInfo.id;
    }
    params = this.clearUndefined(params);
    this.setState({
      loading: true
    });
    const {ecode,message:msg,} = await post(url,params);
    if (ecode) {
      message.error(msg);
      this.setState({
        loading: false
      });
    } else {
      message.success("操作成功");
      this.hide();
      onOk && onOk();
    }
  }
  clearUndefined(data) {
    let res = {};
    Object.keys(data).map(z => {
      res[z] = (data[z] === undefined || data[z] === 'undefined') ? null: data[z];
    });
    return res;
  }
  onCancel = () => {
    const {onCancel,} = this.props;
    this.hide();
    onCancel && onCancel();
  };
}

CommonModal.propTypes = {
  title: PropTypes.string,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  actionSrc: PropTypes.shape({ // 操作地址
    edit: PropTypes.string,
    add: PropTypes.string,
  }).isRequired,
  items: PropTypes.arrayOf( // 生成表单地址或者数组
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  detailData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]), // 获取详情地址或者详情数据
  detailDataFormat: PropTypes.func, // 通过接口获取到详情后格式化函数
  submitFormat: PropTypes.func, // 提交数据之前格式化
};

CommonModal.defaultProps = {
  title: "",
  cancelText: "取消",
  okText: "确定",
  isForm: true,
  detailData: {},
  detailDataFormat: x => x,
  submitFormat: (x) => x,
  autoPrefixTitle: true,
};

