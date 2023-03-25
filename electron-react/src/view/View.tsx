import { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import ShortcutComponent from "../component/ShortcutComponent";
import { getAllShortcut } from "../storage/crud";
import openNotification from "../component/Notification";

import "../style/view-style.scss";

const ResponsiveGridLayout = WidthProvider(Responsive);

class View extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      breakpoints: { lg: 1000, md: 800, sm: 600, xs: 300, xss: 150 },
      cols: { lg: 12, md: 12, sm: 10, xs: 6, xss: 1 },
      currentLayout: [],
      items: [],
      layouts: {},
      length: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = (): Promise<any> => {
    return new Promise(() =>
      getAllShortcut().then((rows) => {
        if (rows && rows.length > 0) {
          this.setState({ items: rows });
          this.setState({ length: rows.length });
          const layouts = this.generateLayouts(rows, this.state.cols);
          this.setState({ layouts });
          this.setState({ currentLayout: layouts['lg'] });
          openNotification({ message: "All data loaded successfully" });
        }
      })
    );
  };

  generateLayouts(items: any, cols: any): any {
    return {
      lg: this.generateLayout(items, cols.lg, 2),
      md: this.generateLayout(items, cols.md, 4),
      sm: this.generateLayout(items, cols.sm, 2),
      xs: this.generateLayout(items, cols.xs, 2),
      xss: this.generateLayout(items, cols.xss, 2),
    };
  }

  generateLayout(items: any, cols: number, xAxisIncrement: number): any {
    const layout: any = [];
    let x = 0;
    let y = 0;

    layout.push({
      i: items[0].id,
      x: 0,
      y: 0,
      w: 2,
      maxW: 2,
      minW: 2,
      h: 1,
      maxH: 1,
      minH: 1,
      isBounded: true,
      isDraggable: true,
    });
    for (let i = 1; i < items.length; i++) {
      x += xAxisIncrement;
      if (cols <= x) {
        x = 0;
        y++;
      }
      layout.push({
        i: items[i].id,
        x,
        y,
        w: 2,
        minW: 2,
        maxW: 2,
        h: 1,
        minH: 1,
        maxH: 1,
        isBounded: true,
        isDraggable: true,
      });
      console.log(cols, xAxisIncrement, x, y, i)
    }
    return layout;
  }

  onBreakpointChange = (newBreakpoint: string, newCols: number) => {
    console.log(newBreakpoint, newCols);
    this.configureLayout(newBreakpoint);
  };

  onWidthChange = (containerWidth: number) => {
    let type = 'lg'
    if (containerWidth >= this.state.breakpoints.lg) {
      type = 'lg'
    }

    if (this.state.breakpoints.lg > containerWidth && containerWidth >= this.state.breakpoints.md) {
      type = 'md'
    }

    if (this.state.breakpoints.md > containerWidth && containerWidth >= this.state.breakpoints.sm) {
      type = 'md'
    }

    if (this.state.breakpoints.sm > containerWidth && containerWidth >= this.state.breakpoints.xs) {
      type = 'sm'
    }
    
    if (this.state.breakpoints.xs > containerWidth && containerWidth >= this.state.breakpoints.xss) {
      type = 'xs'
    }

    if (this.state.breakpoints.xss > containerWidth) {
      type = 'xss'
    }

    this.configureLayout(type);
  }

  onLayoutChange = (layout: any) => {
    console.log(layout)
    this.configureLayout(layout);
  };

  configureLayout(type: string) {
    if (type === 'lg' || type === 'md' || type === 'sm' || type === 'xs' || type === 'xss') {
      const newLayout = this.state.layouts[type];
      console.log(type, newLayout)
      if (newLayout) {
        this.setState({ currentLayout: newLayout });
      }
    }
  }

  generateDOM() {
    return this.state.items.map((item: any, i: number) => {
      return (
        <div key={i} data-grid={this.state.currentLayout[i]}>
          <ShortcutComponent shortcut={item} />
        </div>
      );
    });
  }

  render() {
    return (
      <ResponsiveGridLayout
        breakpoints={this.state.breakpoints}
        cols={this.state.cols}
        className="view-layout"
        items={this.state.length}
        isBounded={false}
        isResizable={false}
        layouts={this.state.layouts}
        margin={[5, 5]}
        onBreakpointChange={this.onLayoutChange}
        onLayoutChange={this.onLayoutChange}
        onWidthChange={this.onWidthChange}
        rowHeight={180}
        useCSSTransforms={true}
        {...this.props}
      >
        {this.generateDOM()}
      </ResponsiveGridLayout>
    );
  }
}

export default View;
