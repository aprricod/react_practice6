import React from "react";

export default class Child extends React.Component {
  componentWillUnmount() {
    console.log("componentWillUnmount from Child");
  }

  render() {
    return <h1>Child</h1>;
  }
}
