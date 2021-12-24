import {useState} from "react";
import {useRouter} from "next/router";
import Scroll, {Element} from "react-scroll";
import styles from "../styles/menu.module.css"
import Main from "../components/main"

export default function Home(props) {

    const router = props.router



    return (
        <div className={styles.content}>
            {/*<br/>*/}
            {/*<font size={+7} color={"#444444"} face={"century schoolbook"}>*/}
            {/*    <strong>Рамсеевская теория графов</strong>*/}
            {/*</font>*/}

            {/*<div className={styles.buttons}>*/}
            {/*<input className={styles.buttonStart} type="button" value="Рамсеевская теория графов: теория и практика" onClick={() => router.push('/lvl0')}/>*/}


            {/*<input className={styles.buttonStart} type="button" value="кнопка" onClick={() => router.push('/create_multiplayer')}/>*/}
            {/*</div>*/}

            <Main router = {props.router}/>

        </div>
    )
}