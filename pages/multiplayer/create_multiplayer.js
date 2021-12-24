import styles from "../../styles/lobby.module.css";
import SideBar from "../../components/SideBar";
import multiplayerGame from "../../components/multiplayerGame";
import { nanoid } from 'nanoid'
import {useState} from "react";
import Link from 'next/link'

export default function Create_multiplayer(props) {

    const router = props.router

    const [lin, setLin] = useState('');

    function createLink(){
        setLin('https://ramsay.vercel.app/multiplayer/' + nanoid())

    }

    return (
        <div className={styles.content}>
            <div>
                <p align='center'>
                    Нажмите на кнопку, чтобы создать ссылку.<br/>
                    После этого перейдите по ней и поделитесь с другом. Удачной игры!
                </p>
                <input className={styles.button23} onClick={createLink} value="Создать лобби" type = "button" role='button'/>
                <div>
                    <Link href={lin}>
                        <a>{lin}</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}