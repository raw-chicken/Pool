import React, { Component } from "react";
import '../css/DriverInfo.css';
 
class DriverInfo extends Component {
  render() {
    var visibility = "hide";
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }
    
    return (
      <div id="flyoutMenu" className={visibility}>
        <h2><a href="#">Home</a></h2>
        <h2><a href="#">About</a></h2>
        <h2><a href="#">Contact</a></h2>
        <h2><a href="#">Search</a></h2>
      </div>
    );
  }
}
 
export default DriverInfo;