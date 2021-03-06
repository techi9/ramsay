import React from "react";
import Vertex from "./Vertex";
import Line from "./Line";
import styles from '../styles/colorSelector.module.css'
import styles2 from '../styles/lvl4win.module.css'
import graphGeneration from '/utility/graphGeneration'
import shuffle from '/utility/shuffle'
import lvl4 from "../styles/lvl4.module.css"


class Lvl4Game extends React.Component {
    vertexList = []
    lineList = []
    list = [this.vertexList, this.lineList]
    redTriangles = 0

    constructor(props) {
        super(props);
        let radius = 18, xCenter = 110, yCenter = 60, n = this.props.n
        this.list = graphGeneration(this.list, n, radius, xCenter, yCenter, this.handleClick)
        this.vertexList = this.list[0]
        this.lineList = this.list[1]

        this.state = {
            vertexList : this.vertexList,
            lineList: this.lineList,
            userColor : "red",
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
                //return true;
                count ++
            }
        }
        if(color === "red"){
            this.redTriangles += count
        }
        console.log(this.redTriangles)
        return count !== 0;


    }

    checkRedTriangles = (line) => {
        /*if(this.check(line, "red")){
            this.redTriangles++
        }*/
        this.check(line, "red")
        //console.log(this.redTriangles)
        //console.log(this.redTriangles <= 4)
        return this.redTriangles <= 4;
    }


    checkWin = () =>{
        for(let index in this.lineList){
            if(this.lineList[index].color === "gray"){
                return
            }
        }
        this.setState({
            userWin : true
        })
    }

    handleClickRedButton = () => {

        this.setState({userColor : "red"})

    }

    handleClickBlueButton = () => {
        this.setState({userColor : "blue"})
    }


    handleClick = index => vertex1 => vertex2 =>  {

        if(this.state.userLoose){
            return
        }

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


        if(((this.lineList[index].color === 'red') ? !this.checkRedTriangles(this.lineList[index]) : false) ||
            ((this.lineList[index].color === 'blue') ? this.check(this.lineList[index], "blue") : false)){
            this.setState({userLoose: true})
            console.log("looooooose")
            return
        }
        else {
            this.setState({userLoose: false})

        }
        this.checkWin()

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
            <div className={lvl4.content}>

                <div className={lvl4.text1}>
                    {this.props.Text()}

                </div>
                <div className={lvl4.content2}>
                    <div className={lvl4.rules}>
                        <font size={+4} FACE={"century schoolbook"}>
                        <p>А какого наименьшее число для графа К7? Получается, что n = 7 – это третий случай, в котором k = 1.
                            Следовательно, по формулам наименьшее число одноцветных треугольников равно <br/>
                            <div style={{textAlign : "center"}}> <font size={+5}> ⅓</font> • 2•1•(1 + 1)(4•1 - 1) = 4. </div>
                            {/*<font size={+5}> ⅓</font> • 2•1•(1 + 1)(4•1 - 1) = 4.<br/>*/}
                            Попробуем в этом убедиться.</p>

                        <p><strong>Ваша задача</strong>: 2-раскрасить полный граф с 7-ю вершинами так,
                            чтобы не получилось синих треугольников и
                            получилось не более четырёх красных треугольников.</p>
                        </font>
                        <div className={lvl4.colorselector}>
                            <input className={lvl4.buttonRed} type="button" value="  " onClick={this.handleClickRedButton}
                                   style={{"border-color": this.state.userColor === "red" ? "#151414" : "#d51717" }}/>
                            <input className={lvl4.buttonBlue} type="button" value="  " onClick={this.handleClickBlueButton}
                                   style={{"border-color": this.state.userColor === "blue" ? "#151414" : "#1776d5"}}/>
                        </div>

                        <input className={lvl4.buttonRetry2} src="/retryButton.png" type="image" onClick={this.retryButton}/>


                    </div>
                    <div className={lvl4.graph}>


                        <svg viewBox="80 40 100 48" xmlns="http://www.w3.org/2000/svg">
                            {linesToRender}
                            {vertexesToRender}
                            {/*<rect width="100%" height="100%"/>*/}

                        </svg>
                    </div>

                    <div className={lvl4.LooseWinContainer2}>
                        {this.state.userWin ? <input className={lvl4.WinInf} type="button" value="Вы выиграли" /> : ''}
                        {this.state.userLoose ?<input className={lvl4.LooseInf} type="button" value="Вы проиграли"/> : ''}
                    </div>
                </div>
            </div>

        );
    }
}

export default Lvl4Game