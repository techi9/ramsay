import React, {Component} from "react";
import Vertex from "./Vertex";

class Game extends React.Component {
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

        let vertexList = [<Vertex x = "40" y = "10" key = "1"/>, <Vertex x = "45" y = "10" key = "2"/>]

        return (
            <div>
                <svg viewBox="0 0 100 47" xmlns="http://www.w3.org/2000/svg">
                    {/*<circle cx="50%" cy="50%" r="4" fill={this.state.color} onClick={this.handleClick}/>*/}
                    {vertexList}
                </svg>
            </div>
        );
    }
}

export default Game