# 使用范围
 通用表格

# API

| 属性        | 说明    |  required  |  类型  |  默认值  |
| --------   | -----:  | :----: | :----:  | :----:  |
| url     | 数据请求url  | true | String | 
| columns     | 表头描述项  | true | Array | 
| params     | 请求附加的参数(eg: 筛选条件)  | false | Object | {} |
| showPage     | 分页展示  | false | Boolean | true |
| showIndex     | 分页展示  | false | Boolean | false |
| deleteUrl     | 用户点击删除是请求的url  | false | Boolean | '' |



# columns格式

 `columns`为列表, 其中每一项支持`string`和`object`两种类型
 ```javascript
  columns={[
    'name|作业名字',
    'projectName|归属项目',
    {
      key: 'workType',
      title: '作业类型',
      render:  text => formatValue(workTypes[text]),
    }
  }
 ```
1. col配置为 `String` 
    
    组件简化了`antd`的 `columns` 配置, 支持按照 `key|title|type|align` 方式简写col, 
    
    约定: 以`|`符号分割每一项.

    举个栗子: "`name|作业名字|time|center`".

    在组件内,会被解析成
    ```javascript
      {
        key: 'name',
        title: '作业名字',
        align: 'center',
        dataIndex: 'name',
        /* 整理根据type来选择不同的format方法, type支持[time, value, number] */
        render: text => formatTimeVal(text) 
      }
    ```

2. col配置为 `Obejct`

    `key` 和 `title` 这两个是必须的, 其他键可以参考`antd`

    栗子: 

    * 普通写法
    ```javascript
      {
        key: 'name',
        title: '作业名字',
        align: 'center',
        dataIndex: 'name',
        render: text => formatTimeVal(text) 
      }
    ```
    * 只传必须项
    ```javascript
      // 等价于 ==> `name|作业名字`
      {
        key: name,
        title: '作业名字',
      }
    ```
    * 一般情况
    ```javascript
      // 一般是为了解决 某项值后端只传key, 需要我们自己根据key显示对应value的情况
      {
        key: 'workType',
        title: '作业类型',
        render:  text => formatValue(workTypes[text]),
      }
    ```
    * 特殊情况(一般用在表格最后一列, 显示操作按钮)

      <span style="color: #f00">
        注意: 在btns存在, 并且deleteUrl存在时会额外多渲染一个删除按钮, 
        这个时候, 无需在手动在btns中声明删除按钮
      </span>
      
    ```javascript
      // 特殊情况, 表格参数可接受一个包含btns键的object
      // btns 为Array, 
      // btns字段说明: text: string --按钮文字
      //          style: object --自定义按钮样式
      //          disabled: boolean|function 是否禁用, 当disabled为function时, 回调参数为当前行数据
      //          onClick: function -- 按钮点击回调, 
      {
        btns: [{
          text: '详情',
          style: {
            color: '#000',
          },
          disabled: row => row.workStatus === 0,
          onClick: (row, rowIdx) => {
            // row: 行数据
            // rowIdx列索引
            console.log(row, rowIdx);
          },
        },],
      },
    ```

# 更新数据
table会比较传入的params, 并跟自己的params比较, 两者不一致时, 会触发重新获取数据
此场主要用在筛选栏中

# usage

```javascript
import React, {PureComponent,} from "react";
import CommonTable from "../../../libs/components/table/index";
import {formatValue,} from "../../../util";
import {workTypes, workStatuses,} from '../../../util/const';

export default class Work extends PureComponent {
  state = {
    params: {
      data: 6,
    },
  };

  componentDidMount(){
    let {params: {data,},} = this.state;
    // 测试, 每秒更新params, 触发table每秒更新数据
    setInterval(()=>{
      this.setState({
        params: {
          data: ++data,
        },
      });
    }, 1000);
  }

  render() {
    const {params,} = this.state;
    return (
      <div>
        <div className="common-search-box" />
        <div className="common-container">
          <CommonTable
            url="work/workPageList"
            params={params}
            deleteUrl="work/deleteWork"
            showPage
            showIndex
            columns={[
              'name|作业名字',
              'projectName|归属项目',
              {
                key: 'workType',
                title: '作业类型',
                render:  text => formatValue(workTypes[text]),
              },
              'riskName|风险级别',
              'stationName|工作站场',
              'startTime|开始时间|time',
              'endTime|结束时间|time',
              {
                key: 'workStatus',
                title: '作业状态',
                render: text => formatValue(workStatuses[text]),
              },
              {
                btns: [{
                  text: '详情',
                  style: {
                    color: '#000',
                  },
                  disabled: row => row.workStatus === 0,
                  onClick: (row, rowIdx) => {
                    console.log(row, rowIdx);
                  },
                },],
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

```
