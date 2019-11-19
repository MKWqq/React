/*
 * @Author: qwang
 * @Date: 2018-08-03 16:15:57
 * @Last Modified by: qwang
 * @Last Modified time: 2018-08-07 15:30:01
 * @Desc: 表格筛选组件
 */
import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Select, Input, DatePicker, Button} from 'antd';

import {post, get} from '../../api/index';
const InputSetting = {
  style: {
    width: "1.4rem"
  }
};

const SelectSetting = {
  ...InputSetting,
  placeholder: "全部",
  allowClear: true,
  showSearch: true
}

const DatePickerRangeSetting = {
  style: {
    width: '3rem'
  }
};
const DatePickerSetting = {
  style: {
    width: '1.7rem'
  }
};

class SearchBox extends PureComponent {
  state = {
    data: []
  }
  componentDidMount() {
    this.init(this.props);
  }
  init({url,data,dataKey = '', method = 'get',params}) {
    if (url) { // 当配置中存在url, 则data不起作用
      this.fetchData(url, method, dataKey, params);
    } else {
      this.setState({data});
    }
  }
  componentWillReceiveProps(newProps) {
    if (!_.isEqual(newProps, this.props)) {
      this.init(newProps);
    }
  }
  /**
   * 获取数据
   * @param {*} url
   * @param {*} method
   * @param {*} dataKey dataKey, 从服务器返回数据中取哪一个字段来作为下拉框数据
   * @param {*} params 额外的参数
   */
  async fetchData(url, method, dataKey, params = {}) {
    let res = {};
    switch (method) {
      case 'get':
        res = await get(url);
        break;
      case 'post':
        res = await post(url, params);
    }
    if (res.ecode === 0) {
      this.setState({
        data: _.get(res, dataKey, [])
      });
    }
  }
  // Select Option
  generateOption(data) {
    if (Array.isArray(data)) {
      return data.map(({id, name}) => {
        return (
          <Select.Option value={id} key={name}>
            {name}
          </Select.Option>
        )
      })
    } else {
      return Object
        .keys(data)
        .map(z => {
          return (
            <Select.Option value={z} key={z}>
              {data[z]}
            </Select.Option>
          );
        })
    }
  }
  render() {
    const {value, onChange} = this.props;
    const {data} = this.state;
    return (
      <Select
        {...SelectSetting}
        value={value}
        showSearch
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={val => onChange(val)}>
        {this.generateOption(data)}
      </Select>
    )
  }
}

export default class CommonTableFilter extends PureComponent {
  state = {
    filterOptions: {}
  }
  render() {
    return <div className="common-search-box">
      {this.generateSearchBox()}
      {this.generateExtraBtns()}
    </div>
  }
  generateExtraBtns(){
    const {btns} = this.props;
    if (Array.isArray(btns) && btns.length) {
      return (
        <div>
          <div className="item-btn">
            {
              btns.map(({icon, text, type="primary", className, onClick})=>{
                return (
                  <Button
                    key={text}
                    type={type}
                    className={`btn-icon ${className}`}
                    onClick={onClick}
                    style={{
                      marginRight: '.2rem'
                    }}
                  >
                    <span className={`icon ${icon}`} />
                    {text}
                  </Button>
                )
              })
            }
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
  /**
   * @func setParam 设置搜索参数
   * @param key key
   * @param val value
   */
  setParam = (key, val) => {
    const {filterOptions} = this.state;
    this.setState({
      filterOptions: {
        ...filterOptions,
        [key]: val
      }
    });
  }
  /**
   * @func generateSelect 生成下拉框
   * @param {
   * key: 搜索字段名,
   * title: label,
   * data: 下拉列表数据
   * }
   */
  generateSelect = (param) => {
    const {filterOptions} = this.state;
    return (
      <div className="item-input" key={param.key}>
        <span className="label">{param.title}</span>
        <SearchBox
          {...param}
          value={filterOptions[param.key]}
          onChange={val => this.setParam(param.key, val)}/>
      </div>
    )
  }
  /**
   * @func generateInput 生成输入框
   * @param: {
   * key,
   * placeholder
   * }
   */
  generateInput = ({key, placeholder}) => {
    const {filterOptions} = this.state;
    return (
      <div className="item-input" key={key}>
        <Input
          {...InputSetting}
          value={filterOptions[key]}
          placeholder={placeholder}
          onChange={e => e.target.value.length < 50 && this.setParam(key, e.target.value)}/>
      </div>
    )
  }
  // dateRangePicker
  generateDateRange = ({key, title, other,}) => {
    const {filterOptions} = this.state;
    return (
      <div className="item-input" key={key}>
        {title && <span className="label">{title}</span>}
        <DatePicker.RangePicker
          {...DatePickerRangeSetting}
          {...other}
          value={filterOptions[key]}
          onChange={val => this.setParam(key, val)}/>
      </div>
    )
  }
  // 生成DatePicker
  generateDate = ({key, title}) => {
    const {filterOptions} = this.state;
    return (
      <div className="item-input" key={key}>
        {title && <span className="label">{title}</span>}
        <DatePicker
          {...DatePickerSetting}
          value={filterOptions[key]}
          onChange={val => this.setParam(key, val)}/>
      </div>
    )
  }
  // 生成筛选和重置按钮
  generateFilterBtn() {
    return [
      <div className = "item-btn" key = "filter" >
        <Button className="btnHollow" onClick={this.search}>
          筛选
        </Button>
      </div>,
      <div className="item-btn" key="reset">
        <Button
          onClick={this.resetParams}
        >
          重置
        </Button >
      </div>
    ]
  }
  // 生成搜索框
  generateSearchBox() {
    const {params} = this.props;
    // 处理换行的情况
    let rows = [];
    let _row = [];
    params.forEach(p => {
      if (_.isEmpty(p)) {
        if (!_.isEmpty(_row)) {
          rows.push(_row);
        }
        _row = [];
      } else {
        _row.push(p);
      }
    });
    if (!_.isEmpty(_row)) {
      rows.push(_row);
    }
    return rows.map((row, i) => {
      return (
        <div key={i}>
          {row.map(param => {
            if (param === null || 'object' !== typeof param) {
              console.error('filteroption must be an object');
              return;
            }
            switch (param.type) {
              case 'select':
                return this.generateSelect(param);
              case 'input':
                return this.generateInput(param);
              case 'date':
                return this.generateDate(param);
              case 'dateRange':
                return this.generateDateRange(param);
              default:
                console.warn('unknown type of filteroption');
                return null;
            }
          })
}
{/* 生成筛选按钮 */}
          {(i + 1 === rows.length) && this.generateFilterBtn()
}
        </div>
      )
    })
  }
  // 点击搜索筛选按钮
  search = () => {
    const {onChange, params} = this.props;
    const {filterOptions} = this.state;
    const range = params.filter(p => p.type === 'dateRange');
    let options = {
      ...filterOptions
    };
    // rangeKeys必须保持唯一, 否则当有多个dateRangePicker时处理会发生覆盖
    const rangeKeys = ['startTime', 'endTime'];
    if (range.length) {
      range.forEach(r => {
        options = Object.assign(options, {
          ...this.getStartAndEndTime(options[r.key], r.rangeKeys || rangeKeys)
        });
        delete options[r.key];
      })
    }
    onChange && onChange(options);
  }
  // 拆分dateRangePicker
  getStartAndEndTime(rangeTime, times){
     let startTime = null;
     let endTime = null;
     const format = "YYYY-MM-DD";
     if (rangeTime && rangeTime[0] && moment(rangeTime[0]).isValid() && rangeTime[0] !== undefined) {
       startTime = moment(`${moment(rangeTime[0]).format(format)} 00:00:00`);
     }
     if (startTime && moment(rangeTime[1]).isValid() && rangeTime[1] !== undefined) {
       endTime = moment(`${moment(rangeTime[1]).format(format)} 23:59:59`);
     }
     return {
       [times[0]]: startTime,
       [times[1]]: endTime,
     };
  }
  // 重置
  resetParams = () => {
    const {filterOptions} = this.state;
    const options = _.cloneDeep(filterOptions);
    for (let [key, value]of Object.entries(options)) {
      // 如果是数组, 则重置成[], 否则undefined
      options[key] = _.isArray(value)
        ? []
        : undefined;
    }
    this.setState({
      filterOptions: {
        ...options
      }
    }, this.search);
  }
  componentDidMount() {
    const {params} = this.props;
    params.forEach(param => {
      if (!_.isEmpty(param) && param.defaultValue) {
        // 处理defaultValue
        this.setParam(param.key, param.defaultValue);
      }
    });
  }
}

CommonTableFilter.propTypes = {
  params: PropTypes.array.isRequired
};
