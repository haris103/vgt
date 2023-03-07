import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 80,
  border: "1px solid black",
  margin: 6,
  padding: 8,
};

class InfiniteScroller extends React.Component {
  state = {
    items: Array.from({ length: 20 }),
    hasMore: true,
  };

  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 })),
      });
    }, 500);
  };

  render() {
    return (
      <div>
        <h1>Infinite scroll</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...{this.state.items.length} out of 500</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Thank you!!</b>
            </p>
          }
        >
          This is a trial for infinite scroll
          {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default InfiniteScroller;
