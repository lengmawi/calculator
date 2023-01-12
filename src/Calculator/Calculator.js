import Display from "./Display.js";
import ButtonPanel from "./ButtonPanel.js";
import React from "react";
import "../assets/css/Calculator.css";
import calculate from "../assets/javascript/logic/calculate";

export default class Calculator extends React.Component {
  state = { total: null, next: null, operation: null };

  handleClick = buttonName => { 
    this.setState(calculate(this.state, buttonName));
  };

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.next || this.state.total || "0"}/>
        <ButtonPanel clickHandler={this.handleClick}/>
      </div>
    );
  }
}
