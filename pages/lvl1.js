import Head from "next/head";
import styles from "../styles/Home.module.css";
import Lv1Game from "../components/lv1Game"
import game1 from '../styles/colorSelector.module.css'
import Scroll from 'react-scroll'
import {Element} from 'react-scroll'
import {useState} from "react";


function GetText1(){
    return (

            <p>
                <font size={+7} color={"#646363"} face={"century schoolbook"}>
                    <strong>Первая головоломка</strong>
                </font>
                <br/>
                <br/>
                Перед Вами полный граф К6, состоящий из шести вершин,
                каждая из котрых соединена со всеми остальными.
                <br/>  <br/>
                Есть два цвета: синий и красный. Вы можете выбрать цвет, нажав
                на соответсвующую кнопку, расположенную слева.
                <br/> <br/>
                Задача очень проста: Вам нужно раскрасить рёбра этого графа двумя цветами
                так, чтобы <strong>не получились одноцветные треугольники</strong>.
            </p>

    )
}

function GetText2(){
    return (

        <p>
            <font size={+7} color={"#646363"} face={"century schoolbook"}>
                <strong>Вторая головоломка</strong>
            </font>
            <br/>
            <br/>
            a lot of tetxta lot of tetxta lot of tetxta lot of tetxta lot of tetxta lot of tetxta lot of tetxt
            <br/>  <br/>
            a lot of tetxta lot of tetxta lot of tetxt
            <br/> <br/>
            <strong>a lot of tetxta lot of tetxta lot of tetxta lot of tetxta lot of tetxt</strong>.
        </p>

    )
}

function ShowLooseInfo(){
    let scroll = Scroll.scroller
    scroll.scrollTo('LooseInfo1',
    {
        duration: 1500,
        delay: 100,
        smooth: true
    })
}

export default function Home(props) {
    const [showLoose] = useState(false)
    
    return (
        <div>
            <Lv1Game n = "6" text = {GetText1} withGiveUpButton = {true} onGiveUp = {ShowLooseInfo}/>
            <div> {/*Текст почему проиграл*/}
                <Element name="LooseInfo1"/>

                Текст почему проиграл


            </div>
            <Lv1Game n = "5" text = {GetText2}/>
        </div>
    )
}