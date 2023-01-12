import Button from "./Button.js";
import React from "react";
import PropTypes from "prop-types";
import "../assets/css/Calculator.css";

export default class ButtonPanel extends React.Component {
  static propTypes = { clickHandler: PropTypes.func };

  handleClick = buttonName => {
    this.props.clickHandler(buttonName);
  };

  render() {
    return (
      <div className="calculator-grid">
          <Button name="AC" clickHandler={this.handleClick}/>
          <Button name="+/-" clickHandler={this.handleClick}/>
          <Button name="%" clickHandler={this.handleClick}/>
          <Button name="÷" clickHandler={this.handleClick} orange/>
          <Button name="7" clickHandler={this.handleClick}/>
          <Button name="8" clickHandler={this.handleClick}/>
          <Button name="9" clickHandler={this.handleClick}/>
          <Button name="x" clickHandler={this.handleClick} orange/>
          <Button name="4" clickHandler={this.handleClick}/>
          <Button name="5" clickHandler={this.handleClick}/>
          <Button name="6" clickHandler={this.handleClick}/>
          <Button name="-" clickHandler={this.handleClick} orange/>
          <Button name="1" clickHandler={this.handleClick}/>
          <Button name="2" clickHandler={this.handleClick}/>
          <Button name="3" clickHandler={this.handleClick}/>
          <Button name="+" clickHandler={this.handleClick} orange/>
          <Button name="0" clickHandler={this.handleClick} wide/>
          <Button name="." clickHandler={this.handleClick}/>
          <Button name="=" clickHandler={this.handleClick} orange/>
      </div>
    );
  }
}
