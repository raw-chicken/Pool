import React, { Component } from "react";
import '../css/DriverInfo.css';
 
class DriverInfoButton extends Component {
  render() {
    return (
    <button id="roundButton"
        onMouseDown={this.props.handleMouseDown}></button>
    );
  }
}
 
export default DriverInfoButton;