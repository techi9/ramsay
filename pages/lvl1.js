import Head from "next/head";
import styles from "../styles/Home.module.css";
import styles2 from "../styles/colorSelector.module.css"
import Lv1Game from "../components/lv1Game"
import game1 from '../styles/colorSelector.module.css'
import Scroll from 'react-scroll'
import {Element} from 'react-scroll'
import {useState} from "react";
import {useRouter} from "next/router";


function GetText1(){
    return (

            <p>
                <font size={+7} color={"#646363"} face={"century schoolbook"}>
                    <strong>Первая головоломка</strong>
                </font>
                <br/>
                <br/>
                <font size={+4} FACE={"century schoolbook"}>
                    Перед Вами полный граф К6, состоящий из шести вершин,
                    каждая из котрых соединена со всеми остальными.
                    <br/>  <br/>
                    Есть два цвета: синий и красный. Вы можете выбрать цвет, нажав
                    на соответсвующую кнопку, расположенную слева.
                    <br/> <br/>
                    Задача очень проста: Вам нужно раскрасить рёбра этого графа двумя цветами
                    так, чтобы <strong>не получились одноцветные треугольники</strong>.
                </font>
                <br/>
            </p>

    )
}

function GetText2(){
    return (

        <p>
            <font size={+7} color={"#646363"} face={"century schoolbook"}>
                <strong>Вторая головоломка</strong>
                <br/> <br/>

            </font>
            <br/>
            <br/>
            <font size={+4} FACE={"century schoolbook"}>
                Рассмотрим другую головоломку(на этот раз без подвоха, точно-точно).
                Головоломка касается полного графа, имеющего на одну вершину меньше,
                чем граф Рамсея – в нашем случае это граф К5. Очевидно, это наибольший
                полный граф, на котором игра может закончиться вничью. Такой граф называется
                <strong> критическим графом Рамсея</strong> для заданного графа Рамсея К6.
                <br/>  <br/> Головоломка состоит в нахождении раскраски критического графа, при которой не возникает ни одного
                одноцветного треугольника. Такая раскраска называется <strong>критической раскраской</strong>.
                Поэтому Ваша задача – найти критическую раскраску для графа К5.
            </font>
        </p>

    )
}



export default function Home(props) {
    const [showLoose, setShowLoose] = useState(false)
    const router = useRouter()

    function ShowLooseInfo(){
        setShowLoose(true)
        let scroll = Scroll.scroller
        setTimeout(() =>
            scroll.scrollTo('LooseInfo1',
                {
                    duration: 1500,
                    delay: 100,
                    smooth: true
                }),100)

    }

    
    return (
        <div>

            <Lv1Game n = "6" text = {GetText1} withGiveUpButton = {true} onGiveUp = {ShowLooseInfo}/>

            {showLoose ? <div>
                <Element name="LooseInfo1"/>

                <font size={+4} FACE={"century schoolbook"}>
                    Кажется, что-то пошло не так…
                    <br/> <br/>
                    Однако это не удивительно. Оказывается, если граф К6 2-раскрашен, то обязательно найдутся
                    по крайней мере два одноцветных треугольника. То есть как бы Вы не старались раскрасить этот граф,
                    перебирая всевозможные комбинации, итог один – Вы всегда проигрываете. Головоломка решения не имеет.
                    <br/> <br/>
                    Давайте теперь введём понятие «граф Рамсея». Представьте, что Вы с другом решили сыграть в игру на
                    графе К6.
                    У каждого из Вас есть свой цвет, которым Вы собираетесь раскрашивать рёбра. Стоит заметить, что в
                    первой
                    головоломке каждый раз, когда Вы пытались раскрасить рёбра графа К6 так, чтобы не получился
                    одноцветный
                    треугольник, он всегда получался. Значит, играя с другом, один из Вас точно проиграет, первым
                    построив
                    тот самый одноцветный треугольник. Тогда <strong>граф Рамсея</strong> – это наименьший полный граф,
                    на котором ничья невозможна.
                    <br/> <br/>
                </font>
                <hr noshade width="98%" align="left" size="6" style={{color: "black", backgroundColor : "black", marginBottom:"80px", marginTop: "50px"}}/>
            </div> : ''}

            {showLoose ? <Lv1Game n = "5" text = {GetText2}/> : ''}
            {showLoose ? <input className={styles2.buttonNext} type="button" value="Продолжить" onClick={() => router.push('/lvl2')}/> : ''}

        </div>
    )
}