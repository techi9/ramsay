import styles2 from "../styles/colorSelector.module.css";
import Lvl5Game from "../components/lvl4Game";
import SideBar from "../components/SideBar";
import styles from "../styles/colorSelector.module.css";

function GetText(){

    return (
        <div>
            ,kf
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
