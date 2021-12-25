import React from "react";
import Vertex from "./Vertex";
import Line from "./Line";
import styles from '../styles/colorSelector.module.css'
import graphGeneration from '/utility/graphGeneration'
import Popup from 'reactjs-popup'
import lvl5 from "../styles/lvl5.module.css"
import multi from "../styles/multi.module.css"
import Pusher from "pusher-js";
import {Spinner} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css'




class MultiplayerGame extends React.Component {
    vertexList = []
    lineList = []
    list = [this.vertexList, this.lineList]

    constructor(props) {
        super(props);
        console.log("constructor")
        this.lobbyid = this.props.lobbyid

        let radius = 20, xCenter = 110, yCenter = 60, n = this.props.n
        this.list = graphGeneration(this.list, n, radius, xCenter, yCenter, this.handleClick)
        this.vertexList = this.list[0]
        this.lineList = this.list[1]
        this.player = 0
        this.firstTurn = true
        this.firstPlayerTurn = true
        this.current_player = 1
        this.state = {
            vertexList : this.vertexList,
            lineList: this.lineList,
            user1Color: "blue",
            user1Score: 0,
            user2Color : "red",
            user2Score: 0,
            user1Win: false,
            user1Loose: false,
            user2Win: false,
            user2Loose: false,
            deadHeat: false,
            game: true,
            startGame: true,
            currentPlayer: 1
        }
    }

    async componentDidMount() {


        const unloadCallback = (event) => {
            this.leave()
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);


        this.pusher = new Pusher('ec8157dfc2c6e38904fa', {
            cluster: 'eu'
        });

        setTimeout(()=>{this.setState({startGame: false})}, 100)

        let obj = this

        this.channel = this.pusher.subscribe(this.lobbyid);

        const response = await fetch('/api/numOfPlayers', {
            method: 'POST',
            body: JSON.stringify({action: "join", lobbyid: this.lobbyid}),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(data => data.json()).then(
            data => {

                if(data.num ===2){
                    setTimeout(() => obj.setState({startGame: true}), 200)
                }
                obj.player = data.num
            }
        )




        this.channel.bind('join', function (data){
            if(data.num === 2){
                // setTimeout(() => obj.setState({startGame: true}), 200)
                obj.setState({startGame: true})
            }

        });

        this.channel.bind('left', function (data){
            obj.props.router.push('/')
        });

        this.channel.bind('event', function(data) {
            //общий
            //data.index

            if(obj.current_player === 1){
                obj.current_player = 2
            }
            else {
                obj.current_player = 1
            }



            obj.lineList[data.index].line =
                <Line x1={obj.lineList[data.index].x1} y1={obj.lineList[data.index].y1} x2={obj.lineList[data.index].x2} y2={obj.lineList[data.index].y2}
                      onClick = {obj.handleClick} vertex1 = {obj.lineList[data.index].vertex1} vertex2 = {obj.lineList[data.index].vertex2} color={obj.current_player === 1 ? obj.state.user1Color : obj.state.user2Color} index = {data.index}/>;

                obj.lineList[data.index].color = obj.current_player === 1 ? obj.state.user1Color : obj.state.user2Color

            obj.check(obj.lineList[data.index], obj.lineList[data.index].color, true)



            obj.setState({
                currentPlayer: obj.current_player,
                vertexList : obj.vertexList,
                lineList: obj.lineList
            })

            obj.myTurn = false

            obj.checkWin()

        });

        this.channel.bind('retry', function(data){

            for(let index in obj.lineList){
                obj.lineList[index].color = "gray"
                obj.lineList[index].line =
                    <Line x1={obj.lineList[index].x1} y1={obj.lineList[index].y1} x2={obj.lineList[index].x2} y2={obj.lineList[index].y2}
                          onClick = {obj.handleClick} vertex1 = {obj.lineList[index].vertex1} vertex2 = {obj.lineList[index].vertex2}
                          color={obj.lineList[index].color} index = {obj.lineList[index].index}/>;

            }



            this.current_player = 1


            obj.setState({
                vertexList : obj.vertexList,
                lineList: obj.lineList,
                user1Win: false,
                user2Win: false,
                user1Loose: false,
                user2Loose: false,
                deadHeat: false,
                user1Score: 0,
                user2Score: 0,
                currentPlayer: 1
            })

        });



        return () => window.removeEventListener("beforeunload", unloadCallback);
    }

    componentWillUnmount() {
        this.leave()
    }

    leave = () =>{
        this.channel.unsubscribe()
        const response = fetch('/api/numOfPlayers', {
            method: 'POST',
            body: JSON.stringify({action: "left", lobbyid: this.lobbyid}),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
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

    checkWin = () =>{
        for(let index in this.lineList){
            if(this.lineList[index].color === "gray"){
                return
            }
        }
        this.results()
    }

    check = (line, color, add = false) => {

        let count = 0
        for(let i in this.vertexList){
            if(this.checkColor(this.vertexList[i], line.vertex1, color) &&
                this.checkColor(this.vertexList[i], line.vertex2, color)){
                count++
            }
        }
        if (add){
            if(color === this.state.user1Color){
                let t = this.state.user1Score
                this.setState({user1Score : t + count})
            }
            else if (color === this.state.user2Color){
                let t = this.state.user2Score
                this.setState({user2Score : t + count})
            }
        }


        return count;
    }


    results = () => {
        this.forceUpdate()
        if(this.state.user1Score > this.state.user2Score){
            this.setState({user1Win: true})

            return;
        }
        if(this.state.user1Score < this.state.user2Score){
            this.setState({user2Win: true, user1Loose: true})

            return;
        }
        if(this.state.user1Score === this.state.user2Score){
            this.setState({deadHeat: true})
        }

    }



    handleClick = index => vertex1 => vertex2 => {


        if (this.state.userColor === this.lineList[index].color){
            return;
        }
        if (this.lineList[index].color !== 'gray'){
            return;
        }

        // if(this.firstTurn && this.player === 0){
        //     this.player = 1
        //     this.firstTurn = false
        // }

        if(this.current_player !== this.player){
            return;
        }

        this.myTurn = true

        // this.sendPusher.trigger(this.lobbyid, "event", {
        //     index: index
        // });

        const response = fetch('/api/turn', {
            method: 'POST',
            body: JSON.stringify({index: index, lobbyid: this.lobbyid}),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

    };

    retryButton = () => {

        const response = fetch('/api/retry', {
            method: 'POST',
            body: JSON.stringify({lobbyid: this.lobbyid}),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    }

    render() {

        let vertexesToRender = []
        this.state.vertexList.forEach(element => vertexesToRender.push(element.vertex))

        let linesToRender = []
        this.state.lineList.forEach(element => linesToRender.push(element.line))

        console.log("Current = " + this.state.currentPlayer)


        return (
            <div>
            <div className={lvl5.content}>

                <div className={lvl5.rules}>
                    {this.props.Text()}
                    <input className={lvl5.buttonRetry2} src="/retryButton.png" type="image" onClick={this.retryButton}/>
                    <div className={lvl5.count}>
                        <div className={lvl5.count1}>{this.player === 1 ? this.state.user2Score : this.state.user1Score}</div>
                        <div className={lvl5.count2}>{this.player === 1 ? this.state.user1Score : this.state.user2Score}</div>
                        <img src = "/scoreBoard_user.jpg" className={lvl5.countPic}/>

                        {this.state.user1Win && this.player === 2 ? <input className={multi.WinInf} type="button" value="Вы выиграли" /> : ''}
                        {this.state.user1Loose && this.player === 2 ?<input className={multi.LooseInf} type="button" value="Вы проиграли"/> : ''}

                        {this.state.user1Win && this.player === 1 ? <input className={multi.LooseInf} type="button" value="Вы проиграли"/> : ''}
                        {this.state.user1Loose && this.player === 1 ?<input className={multi.WinInf} type="button" value="Вы выиграли" /> : ''}

                        {this.state.deadHeat ?<input className={multi.LooseInf} type="button" value="Ничья"/> : ''}

                    </div>

                </div>

                <div className={lvl5.graph}>
                    <svg viewBox="80 39 100 48" xmlns="http://www.w3.org/2000/svg">
                        {linesToRender}
                        {vertexesToRender}

                    </svg>
                    {this.state.currentPlayer !== this.player ? "" : <input className={styles.turn} type="button" value="Твой ход"/>}
                </div>

                <div className={styles.LooseWinContainer2}>



                </div>

                <Popup open={!this.state.startGame} closeOnDocumentClick={false}>
                    <div className={styles.popup}>
                        <div className={styles.popupEl}>
                            Ожидание второго игрока...
                            <Spinner animation="border" style={{marginLeft: '10px'}} />
                        </div>

                    </div>
                </Popup>

            </div>
            </div>

        );
    }
}

export default MultiplayerGame