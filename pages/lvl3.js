import styles from '../styles/colorSelector.module.css'
import styles2 from "../styles/colorSelector.module.css";
import Lvl3Game from "../components/lvl3Game";


function GetText(){
    return (
        <div className={styles.rules}>
            <p>
                <font size={+7} color={"#646363"} face={"century schoolbook"}>
                    <strong>Игра достижения</strong>
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
        </div>

    )
}

export default function lvl3(props) {

    const router = props.router

    return (
        <div>
            <Lvl3Game n = "7" />
            <input className={styles2.buttonNext} type="button" value="Продолжить" onClick={() => router.push('/lvl4')}/>
        </div>
    )
}
