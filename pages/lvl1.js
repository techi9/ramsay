import Head from "next/head";
import styles from "../styles/Home.module.css";
import Game from "../components/Game"



export default function Home() {
    let x = 15
    x = new Date()
    return (
        <Game/>
    )
}