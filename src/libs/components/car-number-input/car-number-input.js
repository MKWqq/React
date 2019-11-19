import React, {PureComponent} from "react";
import ArrowImg from "./arrow_down.png";
import "./index.less";

/**
 * 车牌号选择
 */
export default class CarNumberInput extends PureComponent {
  constructor(props){
    super(props);
    const {value,} = props;
    const {area,number,} = this.formatValue(value);
    this.state = {
      area,
      number,
      show: false,
      oldValue: area + number,
    };
  }
  CarNumPrefix = [
    "京", "津", "沪", "渝", "冀", "豫", "云","辽","黑", "湘",
    "皖", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘", "晋",
    "蒙", "陕", "吉", "闽", "贵", "粤", "青", "藏", "川", "宁", "琼",
  ];
  render() {
    const {area,show,number,} = this.state;
    const {placement,disabled,} = this.props;
    return (
      <div className={disabled ? 'diy-car-number-input disabled' : 'diy-car-number-input'}>
        <div
          className="area-select"
          onClick={() => {
            if (disabled) {
              return;
            }
            this.setState({show: true,});
          }}
        >
          {
            area ? (
              <span className="val">{area}</span>
            ) : (
              <span className="placeholder">选择</span>
            )
          }
          <img
            src={ArrowImg}
            alt=""
            className="arrow"
          />
          <span className="line"/>
          {
            show && (
              <div className={placement === 'bottom' ? 'area-map bottom' : 'area-map'}>
                {
                  this.CarNumPrefix.map(z => {
                    return (
                      <span
                        key={z}
                        className={z === area ? 'active' : null}
                        onClick={(e) => this.selectItem(e,z)}
                      >
                        {z}
                      </span>
                    );
                  })
                }
              </div>
            )
          }
        </div>
        <input
          disabled={disabled}
          value={number}
          onChange={this.changeNumber}
          placeholder="请输入车牌号"
        />
      </div>
    );
  }

  /**
   * 选择区域
   * @param area
   */
  selectItem = (e,area) => {
    e.stopPropagation();
    this.setState({
      area,
      show: false,
    },this.onChangeVal);
  }
  /**
   * 格式化
   * @param value
   * @returns {{number: string, area: undefined}}
   */
  formatValue = (value) => {
    let area = '';
    let number = '';
    if (value) {
      area = value.substring(0,1) || '';
      if (!/[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}/.test(area)) {
        area = '';
        number = value || "";
      }  else {
        if (value.length > 1) {
          number = value.substring(1,value.length) || "";
        }
      }
    }
    return {
      number,
      area,
    };
  };
  componentWillReceiveProps(newProps,) {
   if (newProps.value !== this.state.oldValue) {
     const val = this.formatValue(newProps.value);
     this.setState({
       ...val,
     });
   }
  }
  /**
   * 修改值
   */
  onChangeVal = () => {
    const {onChange,} = this.props;
    const {number,area,} = this.state;
    onChange && onChange(area + number);
  };
  /**
   * 修改车牌号
   * @param e
   */
  changeNumber = (e) => {
    const val = e.target.value;
    this.setState({
      number: val.toUpperCase(),
    },this.onChangeVal);
  }
}
