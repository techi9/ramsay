import React, {Component} from "react";
import Vertex from "./Vertex";
import Line from "./Line";
import styles from '../styles/colorSelector.module.css'

class Game extends React.Component {

    vertexList = []
    lineList = []


    constructor(props) {
        super(props);

        let angles = this.props.n , radius = 17
        let xCenter = 50, yCenter = 23.5
        for (let i=0; i<angles; i++)
        {
            let angle = 2 * 3.14 / angles * i
            this.vertexList.push({
                'x': xCenter + Math.cos(angle)*radius,
                'y': yCenter + Math.sin(angle)*radius,
                'vertex': <Vertex x = {xCenter + Math.cos(angle)*radius} y = {yCenter + Math.sin(angle)*radius} key = {i+1}/>,
                'index' : i,
                'connectedVertex': []
            })
        }
        let lineIndex = 0
        let angles2 = this.props.n
        for(let i=0; i<angles; i++)
        {
            for(let j=0; j<angles2; j++)
            {
                this.lineList.push({
                    'x1': this.vertexList[this.vertexList.length - j-1].x,
                    'y1': this.vertexList[this.vertexList.length - j-1].y,
                    'x2': this.vertexList[i].x,
                    'y2': this.vertexList[i].y,
                    'line': <Line x1={this.vertexList[this.vertexList.length - j-1].x} y1={this.vertexList[this.vertexList.length - j-1].y} x2={this.vertexList[i].x} y2={this.vertexList[i].y}
                                   onClick = {this.handleClick} vertex1 = {this.vertexList[this.vertexList.length - j-1]} vertex2 = {this.vertexList[i]} color={"gray"} index = {lineIndex}/>
                })
                lineIndex++
            }
            angles2 = angles2-1
        }

        this.state = {
            vertexList : this.vertexList,
            lineList: this.lineList,
            curColor : "red"
        }


    }

    handleClick = index => vertex1 => vertex2 =>  {


        this.lineList[index].line =
            <Line x1={this.lineList[index].x1} y1={this.lineList[index].y1} x2={this.lineList[index].x2} y2={this.lineList[index].y2}
              onClick = {this.handleClick} vertex1 = {vertex1} vertex2 = {vertex2} color={this.state.curColor} index = {index}/>;


        this.setState({
            vertexList : this.vertexList,
            lineList: this.lineList
        })


        console.log(this.curColor)
    };

    handleClickRedButton = () => {

        this.setState({curColor : "red"})
    }

    handleClickBlueButton = () => {
        this.setState({curColor : "blue"})
    }

    render() {

        let vertexesToRender = []
        this.state.vertexList.forEach(element => vertexesToRender.push(element.vertex))

        let linesToRender = []
        this.state.lineList.forEach(element => linesToRender.push(element.line))

        return (
            <div>
                <input className={styles.buttonRed} type="button" value=" я кнопка " onClick={this.handleClickRedButton}
                       style={{"border-color": this.state.curColor === "red" ? "#151414" : "#d51717" }}/>
                <input className={styles.buttonBlue} type="button" value=" я тоже кнопка " onClick={this.handleClickBlueButton}
                       style={{"border-color": this.state.curColor === "blue" ? "#151414" : "#1776d5"}}/>
                <svg viewBox="0 0 100 47" xmlns="http://www.w3.org/2000/svg">

                    {linesToRender}
                    {vertexesToRender}

                </svg>


            </div>

        );
    }
}

export default Game