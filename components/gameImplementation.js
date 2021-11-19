import React, {Component} from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Text } from "react-konva";

class ColoredRect extends React.Component {
    state = {
        color: "green"
    };
    handleClick = () => {
        this.setState({
            color: Konva.Util.getRandomColor()
        });
    };
    render() {
        return (
            <Rect
                x={520}
                y={520}
                width={50}
                height={50}
                fill={this.state.color}
                shadowBlur={5}
                onClick={this.handleClick}
            />
        );
    }
}

export default ColoredRect