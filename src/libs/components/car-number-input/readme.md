# 使用范围
  车牌号选择器

# API

| 属性        | 说明    |  类型  |  默认值  |
| --------   | -----:  | :----: | :----:  |
| onChange     | 值修改毁掉  |  Function |--|
| value | 值  |   string    |'' |
| placement     | 地区选择位置  |  string |enum（"top", "bottom"）|


# usage

```javascript
  import CarNumberInput from "path-to-component";

  class Index  extends PureComponent {
    render() {
      return (
        <div>
          <CarNumberInput />
        </div>
      )
    }
  }
```
