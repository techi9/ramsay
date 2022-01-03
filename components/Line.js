import React, {Component} from "react";
import styles from "../styles/line.module.css"

class Line extends React.Component {

    vertex1 = undefined
    vertex2 = undefined
    index = this.props.index

    constructor(props) {
        super(props);

        this.vertex1 = this.props.vertex1
        this.vertex2 = this.props.vertex2

        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        color : this.props.color,
        strokeWidth : 0.5
    };



    handleClick() {
        this.props.onClick(this.index)(this.props.vertex2)(this.props.vertex1)
        this.setState({
            strokeWidth : 0.7
        })
    }

    render() {
        return (
            <line x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} stroke={this.props.color} strokeWidth={0.8}
                  onClick={this.handleClick} className={styles.line}/>
        );
    }
}

export default Line