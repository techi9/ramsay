import styles from '../styles/colorSelector.module.css'
import styles2 from "../styles/colorSelector.module.css";
import Lvl3Game from "../components/lvl3Game";
import SideBar from "../components/SideBar";


function GetText(){
    return (
            <p>
                <font size={+7} color={"#646363"} face={"century schoolbook"}>
                    <strong>Игра уклонения</strong>
                </font>
                <br/>
                <br/>
                <font size={+4} FACE={"century schoolbook"}>
                    Ещё один вариант игры на графе Рамсея — это игра уклонения. Рассмотрим её на графе К7.
                    <br/>
                    Игра продолжается до тех пор, пока не будет построен одноцветный треугольник. Тот, кто первый
                    построит треугольник одного цвета — проиграл.
                    <br/>
                    То есть Ваша задача: не построить одноцветный треугольник. Чтобы запустить игру, достаточно нажать
                    кнопку «начать» и компьютер сделает первый ход.
                </font>
            </p>
    )
}

export default function lvl3(props) {

    const router = props.router

    return (
        <div className={styles2.lvl3}>
            <SideBar selected = {4}/>
            <Lvl3Game n = "7" Text = {GetText} />
            <input className={styles2.buttonNext33} type="button" value="Продолжить" onClick={() => router.push('/lvl4')}/>
        </div>
    )
}
