import { Component } from "react";
import { Layout } from "antd";
import FooterComponent from "../component/FooterComponent";
import View from "./View";
import { getAllShortcut } from "../storage/crud";

import "../style/home-style.scss";

const { Footer, Content } = Layout;

class Home extends Component<
  any,
  { shortcuts: Array<any>; shortcutSize: number }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      shortcuts: [],
      shortcutSize: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    getAllShortcut().then((rows) => {
      if (rows && rows.length > 0) {
        this.setState({ shortcuts: rows });
        this.setState({ shortcutSize: rows.length });
      }
    });
  };

  render() {
    return (
      <Layout className="home-layout">
        <Content className="home-content">
          {this.state.shortcuts.length > 0 ? (
            <View shortcuts={this.state.shortcuts} refresh={this.getData} />
          ) : (
            <></>
          )}
        </Content>
        <Footer>
          <FooterComponent
            size={this.state.shortcutSize}
            refresh={this.getData}
          />
        </Footer>
      </Layout>
    );
  }
}
export default Home;
