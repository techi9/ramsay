import Head from "next/head";
import styles from "../styles/Home.module.css";
import Game from "../components/game"
import ColoredRect from "../components/tryLine"



export default function Home() {
    let x = 15
    x = new Date()
    return (
        <ColoredRect></ColoredRect>
    )
}