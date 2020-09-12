import React, { Component } from "react";

class Buttons extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                 <button classname='side-bar-buttons'><img  src={`${process.env.PUBLIC_URL}/images/circle.png`} /></button> 
                 <button classname='side-bar-buttons'><img  src={`${process.env.PUBLIC_URL}/images/circle.png`} /></button> 
                 <button classname='side-bar-buttons'><img  src={`${process.env.PUBLIC_URL}/images/circle.png`} /></button> 
                 <button classname='side-bar-buttons'><img  src={`${process.env.PUBLIC_URL}/images/circle.png`} /></button> 
            </div>
        );
    }
}
export default Buttons;
