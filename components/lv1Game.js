import React from "react";
import Vertex from "./Vertex";
import Line from "./Line";
import styles from '../styles/colorSelector.module.css'
import Scroll from 'react-scroll'
import graphGeneration from '/utility/graphGeneration'



class Lv1Game extends React.Component {
    vertexList = []
    lineList = []
    list = [this.vertexList, this.lineList]

    constructor(props) {
        super(props);

        let radius = 17, xCenter = 73, yCenter = 25
        this.list = graphGeneration(this.list, this.props.n, radius, xCenter, yCenter, this.handleClick)
        this.vertexList = this.list[0]
        this.lineList = this.list[1]

        this.state = {
            vertexList : this.vertexList,
            lineList: this.lineList,
            curColor : "red",
            game: true
        }


    }

    getLine(v1, v2){
        for(let i in this.lineList){
            if(this.lineList[i].vertex1 === v1 && this.lineList[i].vertex2 === v2 ||
                this.lineList[i].vertex1 === v2 && this.lineList[i].vertex2 === v1) {
                return this.lineList[i];
            }
        }
        throw "line not found"
    }

    checkColor(v1, v2, color){
        for(let i in this.lineList){
            if((this.lineList[i].vertex1 === v1 && this.lineList[i].vertex2 === v2 ||
                this.lineList[i].vertex1 === v2 && this.lineList[i].vertex2 === v1) && this.lineList[i].color === color){
                return true;
            }
        }
        return false;
    }

    check = (line) => {
        let tmpColor = line.color
        for(let i in this.vertexList){
            if(this.checkColor(this.vertexList[i], line.vertex1, tmpColor) &&
                this.checkColor(this.vertexList[i], line.vertex2, tmpColor)){
                this.showLooseInfo()
                console.log("u lost")
                return;
            }
        }
    }

    showLooseInfo = () => {
        this.setState({
            game : false
        })
        this.props.onGiveUp()
    }


    handleClick = index => vertex1 => vertex2 =>  {

        this.lineList[index].line =
            <Line x1={this.lineList[index].x1} y1={this.lineList[index].y1} x2={this.lineList[index].x2} y2={this.lineList[index].y2}
              onClick = {this.handleClick} vertex1 = {vertex1} vertex2 = {vertex2} color={this.state.curColor} index = {index}/>;
        this.lineList[index].color = this.state.curColor

        this.setState({
            vertexList : this.vertexList,
            lineList: this.lineList
        })

        this.check(this.lineList[index])

    };

    handleClickRedButton = () => {

        this.setState({curColor : "red"})
        console.log(this.lineList)
    }

    handleClickBlueButton = () => {
        this.setState({curColor : "blue"})
    }

    retryButton = () => {

        for(let index in this.lineList){
            this.lineList[index].color = "gray"
            this.lineList[index].line =
                <Line x1={this.lineList[index].x1} y1={this.lineList[index].y1} x2={this.lineList[index].x2} y2={this.lineList[index].y2}
                      onClick = {this.handleClick} vertex1 = {this.lineList[index].vertex1} vertex2 = {this.lineList[index].vertex2}
                        color={this.lineList[index].color} index = {this.lineList[index].index}/>;

        }

        this.setState({
            vertexList : this.vertexList,
            lineList: this.lineList
        })


    }

    render() {

        let vertexesToRender = []
        this.state.vertexList.forEach(element => vertexesToRender.push(element.vertex))

        let linesToRender = []
        this.state.lineList.forEach(element => linesToRender.push(element.line))

        return (
            <div className={styles.content}>

                <div className={styles.rules}>
                    {this.props.text()}
                    <input className={styles.buttonRetry} src="/retryButton.png" type="image" onClick={this.retryButton}/>
                    {this.props.withGiveUpButton ? <input className={styles.buttonLoose} type="button" value="посмотреть решение"
                            onClick={this.showLooseInfo}/> : ''}
                </div>

                <input className={styles.buttonRed} type="button" value="  " onClick={this.handleClickRedButton}
                       style={{"border-color": this.state.curColor === "red" ? "#151414" : "#d51717" }}/>
                <input className={styles.buttonBlue} type="button" value="  " onClick={this.handleClickBlueButton}
                       style={{"border-color": this.state.curColor === "blue" ? "#151414" : "#1776d5"}}/>

                <svg viewBox="50 5 100 48" xmlns="http://www.w3.org/2000/svg">

                    {linesToRender}
                    {vertexesToRender}

                </svg>

            </div>

        );
    }
}

export default Lv1Game