import SideBar from "../../components/SideBar";
import MultiplayerGame from "../../components/multiplayerGame.js";



function GetText(){

    return (
        <div>
            <font size={+5} color={"#646363"} face={"century schoolbook"}>
                <strong>Правила игры</strong>
            </font>
            <br/>
            <font size={+4} FACE={"century schoolbook"}>
                Выигрывает игрок, который построил большее количество
                одноцветных треугольников.
            </font>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}


export default function lobby(props)
{
    return (
    <div>
        <SideBar selected = '7'/>
        <MultiplayerGame n = "7" lobbyid = {props.prop} Text = {GetText}/>
    </div>)
}





export async function getServerSideProps({params})
{
    return {props : {prop : params.gameId}}
}