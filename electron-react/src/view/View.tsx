import { Component } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import ShortcutComponent from "../component/ShortcutComponent";
import { getAllShortcut } from "../storage/crud";
import openNotification from "../component/Notification";

import "../style/view-style.scss";

const ReactGridLayout = WidthProvider(GridLayout);

class View extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      items: [],
      layout: [],
    };
  }

  getData = (): Promise<any> => {
    return new Promise(() =>
      getAllShortcut().then((rows) => {
        if (rows && rows.length > 0) {
          this.setState({ items: rows });
          this.setState({ layout: this.generateLayout(rows) })
          //openNotification({ message: "All data loaded successfully" });
        }
      })
    );
  };

  onLayoutChange = (layout: any) => {
    console.log(layout);
    this.setState({ layout });
  };

  generateLayout(items: any): any {
    const layout: any = [];

    let x = 0
    let y = 0;
    for (let i = 0; i < items.length; i++) {
      if (i % 6 == 0 && i !== 0) {
        x = 0
        y++;
      }
      console.log(i, x, y)
      layout.push({ i: items[i].id, x, y, w: 2, maxW: 2, minW: 2, h: 1, maxH: 1, minH: 1, isDraggable: true, isBounded: true });
      x+=2
    }
    console.log(layout, items);
    return layout;
  }

  componentDidMount() {
    this.getData();
  }

  generateDOM() {
    console.log(this.state)
    return this.state.items.map((item, i) => {
      return (
        <div key={i} data-grid={this.state.layout[i]}>
          <ShortcutComponent shortcut={item}/>
        </div>
      );
    });
  }

  render() {
    return (
      <ReactGridLayout
        isBounded={false}
        isResizable={false}
        onLayoutChange={this.onLayoutChange}
        rowHeight={180}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

export default View;
