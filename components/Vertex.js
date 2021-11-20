import React, {Component} from "react";

class Vertex extends React.Component {
    state = {

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
            <circle cx ={this.props.x} cy={this.props.y} r = "5" />
        );
    }
}

export default Vertex