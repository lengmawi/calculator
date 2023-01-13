import React from "react";
import PropTypes from "prop-types";
import "../assets/css/Calculator.css";

export default class Button extends React.Component {
  static propTypes = {
      name: PropTypes.string,
      operation: PropTypes.bool,
      span: PropTypes.bool,
      clickHandler: PropTypes.func
  };

  handleClick = () => {
    this.props.clickHandler(this.props.name);
  };

  render() {
    var className = [ "component-button",
                       this.props.operation ? "operation" : "",
                       this.props.span ? "span" : ""
    ];
    return (
      <button className={className.join(" ").trim()} onClick={this.handleClick}>{this.props.name}</button>
    )
  };
}
