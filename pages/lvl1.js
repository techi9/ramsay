import Head from "next/head";
import styles from "../styles/Home.module.css";
import ColoredRect from "../components/GameK6"



export default function Home() {
    let x = 15
    x = new Date()
    return (
        <ColoredRect/>
    )
}