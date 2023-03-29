import { Component, useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import ShortcutComponent from "../component/ShortcutComponent";
import { getAllLayout, saveLayout } from "../storage/crud";

import "../style/view-style.scss";

const ResponsiveGridLayout = WidthProvider(Responsive);

class View extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      breakpoints: {
        lg: 1000,
        md: 800,
        sm: 600,
        xs: 300,
        xss: 150,
      },
      cols: { lg: 12, md: 12, sm: 10, xs: 6, xss: 1 },
      layouts: {},
      currentLayout: {},
      currentLayoutType: null,
      isLoaded: false,
    };
  }

  componentDidMount(): void {
    const layouts = this.generateLayouts();
    getAllLayout().then((rows) => {
      if (rows && rows.length > 0) {
        const layouts = {};
        rows.forEach((r: {name: string, layout: any}) => {
          layouts[r.name] = JSON.parse(JSON.parse(r.layout).json_data);
        });
        this.setState({
          currentLayout: layouts["lg"],
          currentLayoutType: "lg",
        });
      } else {
        this.setState({
          currentLayout: layouts["lg"],
          currentLayoutType: "lg",
        });
      }
      this.setState({ isLoaded: true });
      console.log(this.state.currentLayout);
    });
  }

  generateLayouts = () => {
    return {
      lg: this.generateLayout(this.props.shortcuts, this.state.cols.lg, 2),
      md: this.generateLayout(this.props.shortcuts, this.state.cols.md, 4),
      sm: this.generateLayout(this.props.shortcuts, this.state.cols.sm, 2),
      xs: this.generateLayout(this.props.shortcuts, this.state.cols.xs, 2),
      xss: this.generateLayout(this.props.shortcuts, this.state.cols.xss, 2),
    };
  };

  generateLayout = (shortcuts: any, cols: number, xAxisIncrement: number) => {
    const layout: any = [];
    let x = 0;
    let y = 0;

    layout.push({
      i: shortcuts[0].id,
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
    for (let i = 1; i < shortcuts.length; i++) {
      x += xAxisIncrement;
      if (cols <= x) {
        x = 0;
        y++;
      }
      layout.push({
        i: shortcuts[i].id,
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
    }
    return layout;
  };

  onBreakpointChange = (newBreakpoint: string) => {
    this.configureLayout(newBreakpoint);
  };

  onWidthChange = (containerWidth: number) => {
    let type = "lg";
    if (containerWidth >= this.state.breakpoints.lg) {
      type = "lg";
    }

    if (
      this.state.breakpoints.lg > containerWidth &&
      containerWidth >= this.state.breakpoints.md
    ) {
      type = "md";
    }

    if (
      this.state.breakpoints.md > containerWidth &&
      containerWidth >= this.state.breakpoints.sm
    ) {
      type = "md";
    }

    if (
      this.state.breakpoints.sm > containerWidth &&
      containerWidth >= this.state.breakpoints.xs
    ) {
      type = "sm";
    }

    if (
      this.state.breakpoints.xs > containerWidth &&
      containerWidth >= this.state.breakpoints.xss
    ) {
      type = "xs";
    }

    if (this.state.breakpoints.xss > containerWidth) {
      type = "xss";
    }

    this.configureLayout(type);
  };

  onLayoutChange = (layout: any) => {
    console.log(layout);
    saveLayout("lg", layout, false);
  };

  configureLayout = (type: string) => {
    if (
      type === "lg" ||
      type === "md" ||
      type === "sm" ||
      type === "xs" ||
      type === "xss"
    ) {
      const newLayout = this.state.layouts[type];
      if (newLayout) {
        this.setState({
          currentLayout: newLayout,
          currentLayoutType: type,
        });
      }
    }
  };

  generateDOM = () => {
    return this.props.shortcuts.map((s: any, i: number) => {
      return (
        <div key={i} data-grid={this.state.currentLayout[i]}>
          <ShortcutComponent shortcut={s} refresh={this.props.refresh} />
        </div>
      );
    });
  };

  render() {
    return this.state.isLoaded ? (
      <ResponsiveGridLayout
        breakpoints={this.state.breakpoints}
        cols={this.state.cols}
        className="view-layout"
        items={this.props.shortcuts.length}
        isBounded={false}
        isResizable={false}
        layouts={this.state.layouts}
        margin={[5, 5]}
        onBreakpointChange={this.onBreakpointChange}
        onLayoutChange={this.onLayoutChange}
        onWidthChange={this.onWidthChange}
        rowHeight={180}
        useCSSTransforms={true}
        {...this.props}
      >
        {this.generateDOM()}
      </ResponsiveGridLayout>
    ) : (
      <></>
    );
  }
}

export default View;
