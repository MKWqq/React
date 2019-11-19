import React, {PureComponent,} from "react";
import CreateForm from "../../../libs/components/create-add-or-edit-page";
import Info from "./add-from-data";
import "./index.less";

export default class UserEdit extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detailData: {
        username: "12",
        age: 12,
        sex: "男",
        education: 1,
        idNumber: "12345678901234567",
        files: [{
          fileName: "项目文档",
          fileUrl: "www.baidu.com",
          fileSuffix: ".doc",
        },],
        icon: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539923588276&di=7f33d263ad82cfcb09e9ec7e851d3117&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F63%2F07%2F42Q58PIC42U_1024.jpg",],
      },
    };
  }
  render() {
    const {detailData,} = this.state;
    let detail = "user/userDetail/1" || detailData;
    return (
      <CreateForm
        submitFormat={this.submitFormat}
        submitUrl="user/userEdit"
        type="edit"
        detailData={detail}
        detailDataFormat={this.detailDataFormat}
        info={Info}
      />
    );
  }
  submitFormat = (x) => {
    return x;
  }
  detailDataFormat = (x) => {
    return {
      ...x,
      education: `${x.education}`,
    };
  }
  componentDidMount() {
  }
}
