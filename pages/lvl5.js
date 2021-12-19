import styles2 from "../styles/colorSelector.module.css";
import Lvl5Game from "../components/lvl4Game";
import SideBar from "../components/SideBar";
import styles from "../styles/colorSelector.module.css";

function GetText(){

    return (
        <div>
            <font size={+7} color={"#646363"} face={"century schoolbook"}>
                <strong>Финальная игра</strong>
            </font>
            <br/>
            <font size={+4} FACE={"century schoolbook"}>
                Есть ещё одна интересная игра на графе Рамсея. Она продолжается до тех пор, пока все линии
                не будут раскрашены. Таким образом, выигрывает игрок, который построил большее количество
                одноцветных треугольников.
            </font>
        </div>
    )
}

export default function lvl4(props) {

    const router = props.router

    return (
        <div>
            <SideBar selected = {6}/>
            <Lvl5Game n = "7" Text = {GetText}/>
            <input className={styles2.buttonNext3} type="button" value="Продолжить" onClick={() => router.push('/lvl6')}/>
        </div>
    )
}
