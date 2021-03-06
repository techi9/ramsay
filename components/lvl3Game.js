import React from "react";
import Vertex from "./Vertex";
import Line from "./Line";
import styles from '../styles/colorSelector.module.css'
import graphGeneration from '/utility/graphGeneration'
import shuffle from '/utility/shuffle'
import getAssetPathFromRoute from "next/dist/shared/lib/router/utils/get-asset-path-from-route";

class Lvl3Game extends React.Component {
    vertexList = []
    lineList = []
    lineListForTurn = []
    list = [this.vertexList, this.lineList]

    constructor(props) {
        super(props);
        let radius = 20, xCenter = 90, yCenter = 40, n = this.props.n
        this.list = graphGeneration(this.list, n, radius, xCenter, yCenter, this.handleClick)
        this.vertexList = this.list[0]
        this.lineList = this.list[1]

        this.state = {
            vertexList : this.vertexList,
            lineList: this.lineList,
            compColor : "blue",
            userColor : "red",
            looseColor: "yellow",
            userWin: false,
            compWin: false,
            game: true,
            gameStarted: false
        }

        this.turnList = shuffle(this.lineList)

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

    deleteUserLineTurn = (deleteIndex) => {
        for(let index in this.turnList){
            if(this.lineList[deleteIndex].index === this.turnList[index].index){
                this.turnList.splice(index, 1)
                break
            }
        }
    }

    computerTurn = () => {
        let preventWin = false
        for(let index in this.turnList){
            if(this.turnList.length >= 1){
                if(this.lineList[this.turnList[index].index].color !== this.state.userColor &&
                                            !this.check(this.lineList[this.turnList[index].index], this.state.compColor)
                                            && !this.check(this.lineList[this.turnList[index].index], this.state.userColor)){
                    this.lineList[this.turnList[index].index].color = this.state.compColor
                    this.lineList[this.turnList[index].index].line =
                        <Line x1={this.lineList[this.turnList[index].index].x1} y1={this.lineList[this.turnList[index].index].y1}
                              x2={this.lineList[this.turnList[index].index].x2} y2={this.lineList[this.turnList[index].index].y2}
                              onClick = {this.handleClick}
                              vertex1 = {this.lineList[this.turnList[index].index].vertex1}
                              vertex2 = {this.lineList[this.turnList[index].index].vertex2}
                              color={this.state.compColor}
                              index = {this.lineList[this.turnList[index].index].index}/>

                    this.turnList.splice(index, 1)
                    console.log(this.turnList.length)
                    preventWin = true
                    break
                }
            }
        }
        if(!preventWin)
        {
            for(let index in this.turnList){
                if(this.lineList[this.turnList[index].index].color !== this.state.userColor &&
                    !this.check(this.lineList[this.turnList[index].index], this.state.compColor)){
                    this.lineList[this.turnList[index].index].color = this.state.compColor
                    this.lineList[this.turnList[index].index].line =
                        <Line x1={this.lineList[this.turnList[index].index].x1} y1={this.lineList[this.turnList[index].index].y1}
                              x2={this.lineList[this.turnList[index].index].x2} y2={this.lineList[this.turnList[index].index].y2}
                              onClick = {this.handleClick}
                              vertex1 = {this.lineList[this.turnList[index].index].vertex1}
                              vertex2 = {this.lineList[this.turnList[index].index].vertex2}
                              color={this.state.compColor}
                              index = {this.lineList[this.turnList[index].index].index}/>

                    this.turnList.splice(index, 1)
                    console.log(this.turnList.length)
                    preventWin = true
                    break
                }
            }
        }

        if (!preventWin){
            this.lineList[this.turnList[0].index].color = this.state.looseColor
            this.lineList[this.turnList[0].index].line =
                <Line x1={this.lineList[this.turnList[0].index].x1} y1={this.lineList[this.turnList[0].index].y1}
                      x2={this.lineList[this.turnList[0].index].x2} y2={this.lineList[this.turnList[0].index].y2}
                      onClick = {this.handleClick}
                      vertex1 = {this.lineList[this.turnList[0].index].vertex1}
                      vertex2 = {this.lineList[this.turnList[0].index].vertex2}
                      color={this.state.looseColor}
                      index = {this.lineList[this.turnList[0].index].index}/>
        }

        this.setState({userWin: !preventWin })


    }

    handleClick = index => vertex1 => vertex2 =>  {
        if(!this.state.gameStarted) return;
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
            this.setState({compWin: true})
            return
        }
        this.deleteUserLineTurn(index)
        this.computerTurn()

        this.setState({
            vertexList : this.vertexList,
            lineList: this.lineList
        })

    };

    retryButton = () => {

        this.turnList = shuffle(this.lineList)

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
        this.computerTurn();


    }

    render() {

        let vertexesToRender = []
        this.state.vertexList.forEach(element => vertexesToRender.push(element.vertex))

        let linesToRender = []
        this.state.lineList.forEach(element => linesToRender.push(element.line))

        return (
            <div className={styles.content}>

                <div className={styles.rules}>
                    <p>


                        {this.props.Text()}
                    </p>
                    <input className={styles.buttonRetry2} src="/retryButton.png" type="image" onClick={this.retryButton}/>
                </div>

                <svg viewBox="67.5 15 100 48" xmlns="http://www.w3.org/2000/svg">
                    {linesToRender}
                    {vertexesToRender}

                </svg>
                {!this.state.gameStarted ? <input className={styles.StartGame} type="button" value="???????????? ????????" onClick={(e) => {this.setState({gameStarted: true}); this.computerTurn();}} /> : ''}

                <div className={styles.LooseWinContainer2}>
                    {this.state.userWin ? <input className={styles.WinInf} type="button" value="???? ????????????????" /> : ''}
                    {this.state.compWin ?<input className={styles.LooseInf} type="button" value="???? ??????????????????"/> : ''}
                </div>

            </div>

        );
    }
}

export default Lvl3Game