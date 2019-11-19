# 使用范围
 通用表格

# API
| 属性        | 说明    |  required  |  类型  |  默认值  |
| --------   | -----:  | :----: | :----:  | :----:  |
| params     | 配置项目列表  | true | Array | 
| onChange     | 点击筛选或重置触发  | false | Boolean | '' |

# params 说明
  params为一个列表, 用来标记列表中的每一个字段field
  字段说明:
  * type: 标记当前field类型, [input, select, date, dateRange]
  * title: 当前项label
  * key: 当前项参数名, 必须唯一
  * placeholder: placeholder, date或dateRange不可用
  * url: 仅当type为select时有效, 当数据需要从后端获取时, 该项填后端接口地址
  * method: 请求方法, default: 'post'
  * dataKey: 仅当type为select, 且url存在时有效, 当数据获取成功, 内部通过`_.get(res, dataKey, [])`来获取对应的选项
  * rangeKeys: 当`type===dateRange`时, rangeKeys指定后端所需的`startTime`, 和`endTime`的属性名称, 当存在多个`dateRange`时必传, 默认: ['startTime', 'endTime']
  * data: 仅当type为select, 并且url不存在时有效, `array|object` 下拉列表项数据, 
    
    1. 当data为`array`时, 渲染出来的option value为该项索引, label为该项内容
    2. 当data为`object`, option value为对象的key, label为value
  
# onChange

在点击搜索或重置按钮会触发`onChange`事件, 参数为Object, 可直接将此参数放入`commonTable`的params中, 

# usage

```javascript
render() {
    const {filterObj,} = this.state;
    return (
      <div>
        <CommonTableFilter 
          params={[
            {
              type: 'select',
              title: '项目类型',
              key: 'projectType', // 搜索参数名
              // data如果传对象, 
              // 则对象的key作为下拉框的value, 
              // 对象的value作为下拉框的展示值
              // data 如果传数组, 则数组每项必须包含 id和name两个属性
              // id作为下拉框value,
              // name作为下拉框的展示值
              data: ProjectTypes, 
            },
            {},
            {
              type: 'select',
              title: '项目类型',
              key: 'projectType2',
              url: 'department/departmentList',
              method: 'post',
              dataKey: 'data',
            },
            {
              type: 'input',
              key: 'keyword',
              defaultValue: 'xxx',
              placeholder: '请输入...',
            },
            {
              title: '日期',
              type: 'dateRange',
              key: 'dateRange',
              // rangeKeys: ['startTime', 'endTimeasdfsad',],
            },
            {},
            {
              title: '日期',
              type: 'date',
              key: 'date',
            },
            {},
          ]}
          onChange={param=>this.setState({
            filterObj: param,
          })}
        />
        <div className="common-container">
          <CommonTable
            url="work/workPageList"
            params={filterObj}
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
            ]}
          />
        </div>
      </div>
    );
  }

```
