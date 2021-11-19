import React, {Component} from "react";

class ColoredRect extends React.Component {
    state = {
        color1: "green",
        color2: "green",
        color3: "green"
    };
    handleClick1 = () => {
        this.setState({
            color1: "black"
        });
    };
    handleClick2 = () => {
        this.setState({
            color2: "black"
        });
    };
    handleClick3 = () => {
        this.setState({
            color3: "black"
        });
    };
    render() {
        return (
            <div>
                <svg viewBox="0 0 100 47" xmlns="http://www.w3.org/2000/svg">
                    {/*<circle cx="50%" cy="50%" r="4" fill={this.state.color} onClick={this.handleClick}/>*/}
                    <line x1="40" y1="20" x2="60" y2="20" stroke={this.state.color1} onClick={this.handleClick1}/>
                    <line x1="40" y1="20" x2="50" y2="30" stroke={this.state.color2} onClick={this.handleClick2}/>
                    <line x1="50" y1="30" x2="60" y2="20" stroke={this.state.color3} onClick={this.handleClick3}/>
                </svg>
            </div>
        );
    }
}

export default ColoredRect