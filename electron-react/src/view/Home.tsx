import { Component } from "react";
import { Layout } from "antd";
import FooterComponent from "../component/FooterComponent";
import MenuComponent from "../component/MenuComponent";
import { notificationSuccess } from "../component/Notification";
import View from "./View";
import { getAllShortcut } from "../storage/crud";

import "../style/home-style.scss";

const { Header, Footer, Content } = Layout;

class Home extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      shortcuts: [],
      shortcutSize: 0
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    console.log('load')
    getAllShortcut().then((rows) => {
      if (rows && rows.length > 0) {
        this.setState({ shortcuts: rows });
        this.setState({ shortcutSize: rows.length });
        notificationSuccess({ message: "All data loaded successfully" });
      }
    })
  };

  render() {
    return (
      <Layout 
      className="home-layout">
        <Header>
          <MenuComponent refresh={this.getData}/>
        </Header>
        <Content className="home-content">
          {this.state.shortcuts.length > 0 ? <View shortcuts={this.state.shortcuts} refresh={this.getData}/> : <></>}
        </Content>
        <Footer>
          <FooterComponent size={this.state.shortcutSize} refresh={this.getData}/>
        </Footer>
      </Layout>
    );
  }
}
export default Home;
