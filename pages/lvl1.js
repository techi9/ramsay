import Head from "next/head";
import styles from "../styles/Home.module.css";
import Game from "../components/Game"



export default function Home(props) {
    props.PageUpdated(1)
    return (
        <Game n = "6"/>
    )
}