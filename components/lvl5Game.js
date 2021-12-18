import React from "react";
import Vertex from "./Vertex";
import Line from "./Line";
import styles from '../styles/colorSelector.module.css'
import graphGeneration from '/utility/graphGeneration'
import shuffle from '/utility/shuffle'
import lvl5 from "../styles/lvl4.module.css"


class Lvl5Game extends React.Component {
    vertexList = []
    lineList = []
    list = [this.vertexList, this.lineList]
    redTriangles = 0

    constructor(props) {
        super(props);
        let radius = 20, xCenter = 110, yCenter = 60, n = this.props.n
        this.list = graphGeneration(this.list, n, radius, xCenter, yCenter, this.handleClick)
        this.vertexList = this.list[0]
        this.lineList = this.list[1]

        this.state = {
            vertexList : this.vertexList,
            lineList: this.lineList,
            compColor: "blue",
            compScore: 0,
            userColor : "red",
            userScore: 0,
            userWin: false,
            userLoose: false
        }
        this.turnList = shuffle(this.lineList)
    }

    checkColor = (v1, v2, color) => {
        for(let i in this.lineList){
            if((this.lineList[i].vertex1 === v1 && this.lineList[i].vertex2 === v2 ||
                this.lineList[i].vertex1 === v2 && this.lineList[i].vertex2 === v1) && this.lineList[i].color === color){
                return true;
            }
        }
        return false;
    }

    check = (line, color) => {
        // можно попробовать считать количество треугольников и выводить их пока что для проверки
        let count = 0
        for(let i in this.vertexList){
            if(this.checkColor(this.vertexList[i], line.vertex1, color) &&
                this.checkColor(this.vertexList[i], line.vertex2, color)){
                count ++
            }
        }
        if(color === "red"){
            this.redTriangles += count
        }
        console.log(this.redTriangles)
        return count !== 0;
    }

    checkRedTriangles = (line, color) => {
        this.check(line, color)
        return this.redTriangles <= 4;
    }


    handleClick = index => vertex1 => vertex2 =>  {

        if (this.state.userColor === this.lineList[index].color){
            return;
        }
        if (this.lineList[index].color !== 'gray'){
            return;
        }

        this.lineList[index].line =
            <Line x1={this.lineList[index].x1} y1={this.lineList[index].y1} x2={this.lineList[index].x2} y2={this.lineList[index].y2}
                  onClick = {this.handleClick} vertex1 = {vertex1} vertex2 = {vertex2} color={this.state.userColor} index = {index}/>;
        this.lineList[index].color = this.state.userColor

        this.setState({
            vertexList : this.vertexList,
            lineList: this.lineList
        })

        /*if(((this.lineList[index].color === 'red') ? !this.checkRedTriangles(this.lineList[index]) : false) ||
            ((this.lineList[index].color === 'blue') ? this.check(this.lineList[index], "blue") : false)){
            this.setState({userLoose: true})
            return
        }
        else {
            this.setState({userLoose: false})
        }
        this.checkWin()*/

    };

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
            lineList: this.lineList,
            userWin: false,
            userLoose: false
        })

        this.redTriangles = 0

    }

    render() {

        let vertexesToRender = []
        this.state.vertexList.forEach(element => vertexesToRender.push(element.vertex))

        let linesToRender = []
        this.state.lineList.forEach(element => linesToRender.push(element.line))

        return (
            <div className={lvl5.content}>

                <div className={lvl5.text1}>
                    {this.props.Text()}
                    <input className={lvl5.buttonRetry2} src="/retryButton.png" type="image" onClick={this.retryButton}/>
                </div>

                <div className={lvl5.graph}>
                    {/*<input className={lvl5.buttonRed} type="button" value="  " onClick={this.handleClickRedButton}
                           style={{"border-color": this.state.curColor === "red" ? "#151414" : "#d51717" }}/>
                    <input className={lvl5.buttonBlue} type="button" value="  " onClick={this.handleClickBlueButton}
                           style={{"border-color": this.state.curColor === "blue" ? "#151414" : "#1776d5"}}/>*/}

                    <svg viewBox="80 39 100 48" xmlns="http://www.w3.org/2000/svg">
                        {linesToRender}
                        {vertexesToRender}

                    </svg>
                </div>

                <div className={lvl5.LooseWinContainer2}>
                    {this.state.userWin ? <input className={styles.WinInf} type="button" value="Вы выиграли" /> : ''}
                    {this.state.userLoose ?<input className={styles.LooseInf} type="button" value="Вы проиграли"/> : ''}
                </div>

            </div>

        );
    }
}

export default Lvl5Game