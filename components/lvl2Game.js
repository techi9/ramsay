import React from "react";
import Vertex from "./Vertex";
import Line from "./Line";
import styles from '../styles/colorSelector.module.css'
import graphGeneration from '/utility/graphGeneration'

class Lvl2Game extends React.Component {
    vertexList = []
    lineList = []
    list = [this.vertexList, this.lineList]

    constructor(props) {
        super(props);

        let radius = 20, xCenter = 80, yCenter = 30, n = this.props.n
        this.list = graphGeneration(this.list, n, radius, xCenter, yCenter, this.handleClick)
        this.vertexList = this.list[0]
        this.lineList = this.list[1]

        this.state = {
            vertexList : this.vertexList,
            lineList: this.lineList,
            compColor : "blue",
            userColor : "red",
            userWin: false,
            compWin: false,
            game: true
        }
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
        for(let i in this.vertexList){
            if(this.checkColor(this.vertexList[i], line.vertex1, color) &&
                this.checkColor(this.vertexList[i], line.vertex2, color)){
                return true;
            }
        }
        return false;
    }

    getRandomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    colorLine = (line, newColor) => {
        for(let i in this.lineList){
            if(this.lineList[i] === line){
                this.lineList[i].color = newColor
                this.lineList[i].line =
                    <Line x1={this.lineList[i].x1} y1={this.lineList[i].y1} x2={this.lineList[i].x2} y2={this.lineList[i].y2}
                          onClick = {this.handleClick} vertex1 = {this.lineList[i].vertex1} vertex2 = {this.lineList[i].vertex2}
                          color={newColor} index = {this.lineList[i].index}/>;
                break;
            }
        }
    }

    getLine = (v1, v2) => {
        for(let i in this.lineList){
            if(this.lineList[i].vertex1.index === v1.index && this.lineList[i].vertex2.index === v2.index ||
                this.lineList[i].vertex1.index === v2.index && this.lineList[i].vertex2.index === v1.index) {
                return this.lineList[i];
            }
        }
        console.log(v1, v2)
        throw ("line not found")
    }

    lineSelection = () => {

        // 1. проверить, можно ли построить треугольник(т е смотрим на 2 линии из одной вершины)
        for(let i in this.lineList){
            if(this.check(this.lineList[i], this.state.compColor) && (this.lineList[i].color === "gray")){
                console.log("i won")
                this.colorLine(this.lineList[i], this.state.compColor)
                this.setState({
                    compWin: true
                })
                return;
            }
        }
        //0. защита
        for(let i in this.lineList){
            if(this.check(this.lineList[i], this.state.userColor) && this.lineList[i].color === 'gray'){
                console.log("def")
                this.colorLine(this.lineList[i], this.state.compColor)
                return true
            }
        }
        // 2. ищем любую линию, которая выкрашена в голобой цвет
        //          и достраиваем вторую из одной из вершин(рандомно выбери)
        for(let i in this.lineList){
            if(this.lineList[i].color === this.state.compColor){
                console.log("building")
                for(let index in this.vertexList){
                    if(this.lineList[i].vertex1.index !== this.vertexList[index].index) {
                        let tmp = this.getLine(this.lineList[i].vertex1, this.vertexList[index])
                        if (tmp.color !== this.state.userColor && tmp.color !== this.state.compColor) {
                            this.colorLine(tmp, this.state.compColor)
                            return;
                        }
                    }
                }
            }
        }

        // 3. иначе рандомно выбираем линию
        let check = false
        while (check === false){
            let random = this.getRandomNum(0, this.props.n - 1)
            if(this.lineList[random].color !== this.state.userColor &&
                this.lineList[random].color !== this.state.compColor){
                console.log(3)
                this.colorLine(this.lineList[random], this.state.compColor)
                return;
            }
        }
    }

    computerTurn = () => {
        this.lineSelection()
    }

    handleClick = index => vertex1 => vertex2 =>  {

        if(this.state.userWin === true || this.state.compWin === true){
            return;
        }

        if(this.getLine(vertex1,vertex2).color !== "gray"){
            return;
        }

        this.lineList[index].line =
            <Line x1={this.lineList[index].x1} y1={this.lineList[index].y1} x2={this.lineList[index].x2} y2={this.lineList[index].y2}
                  onClick = {this.handleClick} vertex1 = {vertex1} vertex2 = {vertex2} color={this.state.userColor} index = {index}/>;
        this.lineList[index].color = this.state.userColor

        if(this.check(this.lineList[index], this.state.userColor)){
            this.setState({
                userWin: true
            })
        }
        else{
            this.computerTurn()
        }

        this.setState({
            vertexList : this.vertexList,
            lineList: this.lineList
        })



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
            compWin: false
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
                    {this.props.getText()}
                <input className={styles.buttonRetry2} src="/retryButton.png" type="image" onClick={this.retryButton}/>
                </div>

                <svg viewBox="58 5 100 48" xmlns="http://www.w3.org/2000/svg">

                    {linesToRender}
                    {vertexesToRender}

                </svg>
                <div className={styles.LooseWinContainer2}>
                    {this.state.userWin ? <input className={styles.WinInf} type="button" value="Вы выиграли" /> : ''}
                    {this.state.compWin ?<input className={styles.LooseInf} type="button" value="Вы проиграли"/> : ''}
                </div>

            </div>

        );
    }
}

export default Lvl2Game