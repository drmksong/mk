import React, { Component } from "react";
import Header from "../Layout/Header/Header";
import Body from "../Layout/Body/Body";
import Footer from "../Layout/Footer/Footer";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }

  changeHandler = (value) => {
    if (value === 10) this.setState({ page: 1 });
    if (value === 20) this.setState({ page: 2 });
    if (value === 30) this.setState({ page: 3 });
  };

  render() {
    return (
      <div>
        <Header change={this.changeHandler}></Header>

        <Body page={this.state.page}></Body>
        <Footer></Footer>
      </div>
    );
  }
}

export default Layout;
