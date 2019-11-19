import React, {PureComponent,} from "react";
import CreateForm from "../../../libs/components/create-add-or-edit-page";
import Info from "./add-from-data";
import "./index.less";

export default class UserAdd extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CreateForm
        submitFormat={this.submitFormat}
        submitUrl="user/userAdd"
        info={Info}
      />
    );
  }
  submitFormat = (x) => {
    return x;
  }
  componentDidMount() {
  }
}
