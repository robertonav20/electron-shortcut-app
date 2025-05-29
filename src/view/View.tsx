import { Component } from "react";
import ShortcutComponent from "../component/ShortcutComponent";

import "../style/view-style.scss";
import { Row, Col } from "antd/es";

class View extends Component<
  { shortcuts: Array<any>; refresh: any }
> {
  render() {
    return (
      <Row style={{ overflowX: "hidden" }}>
        {Array.from(this.props.shortcuts).map((s: any, i: number) => {
          return (
            <Col
              span={3}
              key={`col-${i}`}
              style={{ margin: '5px' }}
            >
              <ShortcutComponent shortcut={s} refresh={this.props.refresh} />
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default View;
