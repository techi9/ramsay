import React, {Component} from "react";

class Vertex extends React.Component {
    render() {
        return (
            <circle cx ={this.props.x} cy={this.props.y} r = "1" />
        );
    }
}

export default Vertex
