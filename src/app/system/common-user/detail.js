import React, {PureComponent,} from "react";
import DetailPage from "../../../libs/components/detail-page";
import Data from "./test-data";

export default class Detail extends PureComponent {
  render() {
    return (
      <DetailPage
        splitNumber={2}
        detailInfo="./user/userInfo"
        formatData={this.formatValue}
        titleWidth="1.5rem"
      />
    );
  }
  componentDidMount() {
  }
  formatValue() {
    return Data;
  }
}
