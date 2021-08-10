import React, { Component } from "react";
import Header from "./components/Header";
import Container from "./components/Container";
import { connect } from "react-redux";

import ViewSelectorContainer from "./containers/ViewSelectorContainer";
import InputContainer from "./containers/InputContainer";

class App extends Component {
  render() {
    const { view } = this.props;
    return (
      <div>
        <Header />
        <ViewSelectorContainer />
        <Container visible={view === "favorite"}></Container>
        <Container visible={view === "list"}>
          <InputContainer />
        </Container>
      </div>
    );
  }
}
export default connect((state) => ({
  view: state.base.get("view"),
}))(App);
