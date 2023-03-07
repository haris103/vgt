import React, { Component } from "react";
import axios from "axios";

class ScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: false,
      page: 0,
      prevY: 0,
    };
  }

  render() {
    return <div className="container"></div>;
  }
}

export default ScrollComponent;
