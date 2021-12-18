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
                    <div className={styles.contProof}>
                        <div className={styles.leftPic}>
                            Давайте попробуем разобраться, почему это так.
                            <br/>
                            Проще всего объяснить эту задачу на примере компании людей.
                            <br/>
                            Представьте, что каждая вершина в графе — это один человек. Если два человека знакомы, то будем обозначать
                            эту связь, закрашивая зелёным цветом ребро, которое соединяет соответствующие вершины, если люди не знакомы,
                            тогда закрашиваем оранжевым. Обозначим людей в этой компании через буквы A, B, C, D, E, F и рассмотрим одного
                            из них, например, человека под буквой A. Помимо него в компании есть ещё 5 человек, значит, что A будет знаком
                            по крайней мере с тремя, либо незнаком по крайней мере с тремя. Для определённости будем считать, что A знаком
                            с B, C, D. Тогда если B, C будут знакомы, то у нас получится тройка попарно знакомых людей( A – B – C), значит,
                            B и C незнакомы — раскрашиваем в оранжевый цвет ребро BC. Аналогично можно сказать про пары (C, D) и (B, D) —
                            они должны быть не знакомыми. Но в таком случае, у нас получилась тройка незнакомых людей B – C – D,
                            следовательно, мы получили в графе одноцветный треугольник. Задача не решается.
                        </div>
                        <img className={styles.proofpic} src={"/proof.png"} hspace={"800px"} height={"250px"}/>
                    </div>
                <br/><br/><br/><br/>
                </font>
                <hr noshade width="98%" align="left" size="6" style={{color: "black", backgroundColor : "black", marginBottom:"80px", marginTop: "50px"}}/>
            </div> : ''}

            {showLoose ? <Lv1Game n = "5" text = {GetText2}/> : ''}
            {showLoose ? <input className={styles2.buttonNext} type="button" value="Продолжить" onClick={() => router.push('/lvl2')}/> : ''}

        </div>
    )
}