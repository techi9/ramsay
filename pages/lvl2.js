import styles from '../styles/colorSelector.module.css'
import Lvl2Game from "../components/lvl2Game";
import styles2 from "../styles/colorSelector.module.css";




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
                    Граф Рамсея замечателен тем, что на нём можно как разгадывать головоломки, так и проводить игры.
                    Одна из таких игр — это <strong>игра достижения</strong>. Перед Вами граф К7. И если в предыдущих
                    головоломках нельзя было получать одноцветный треугольник, то в данной игре
                    Ваша задача совершенно противоположная.
                    <br/> <br/>
                    В игре достижения выигрывает первый игрок, который завершит построение одноцветного
                    треугольника. Всё просто: Вы делаете ход, нажимая на ребро графа, после этого ход делает компьютер и так далее.
                </font>
            </p>
        </div>

    )
}


export default function lvl2(props) {

    const router = props.router

    return (
        <div>
            <Lvl2Game n = "7" />
            <input className={styles2.buttonNext} type="button" value="Продолжить" onClick={() => router.push('/lvl3')}/>
        </div>
    )
}

