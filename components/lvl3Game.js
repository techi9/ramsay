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
                        <font size={+7} color={"#646363"} face={"century schoolbook"}>
                            <strong>Игра достижения</strong>
                        </font>
                        <br/>
                        <br/>
                        <font size={+4} FACE={"century schoolbook"}>
                            Граф Рамсея замечателен тем, что на нём можно как разгадывать головоломки, так и проводить игры.
                            Одна из таких игр — это <strong>игра достижения</strong>. Перед Вами граф К7. И если в предыдущих
                            головоломках нельзя было получать одноцветный треугольник, то в данной игре
                            Ваша задача совершенно противоположная.
                            <br/> <br/>
                            В игре достижения выигрывает первый игрок, который завершит построение одноцветного
                            треугольника. Всё просто: Вы делаете ход, нажимая на ребро графа, после этого ход делает компьютер и так далее.
                        </font>
                    </p>
                    <input className={styles.buttonRetry2} src="/retryButton.png" type="image" onClick={this.retryButton}/>
                </div>

                <svg viewBox="67.5 15 100 48" xmlns="http://www.w3.org/2000/svg">
                    {linesToRender}
                    {vertexesToRender}

                </svg>
                {!this.state.gameStarted ? <input className={styles.StartGame} type="button" value="Начать игру" onClick={(e) => {this.setState({gameStarted: true}); this.computerTurn();}} /> : ''}

                <div className={styles.LooseWinContainer2}>
                    {this.state.userWin ? <input className={styles.WinInf} type="button" value="Вы выиграли" /> : ''}
                    {this.state.compWin ?<input className={styles.LooseInf} type="button" value="Вы проиграли"/> : ''}
                </div>

            </div>

        );
    }
}

export default Lvl3Game