import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
    let x = 15
    x = new Date()


    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/*----------------------------------------------------------------*/}
            <main className={styles.main}>

                <div className={styles.title}>
                    <h1 align={"left"}>
                        <font size={+6} color={"#808080"} FACE={"century schoolbook"}>
                            <strong>Критический граф</strong>
                        </font>

                    </h1>
                    <hr noshade width="98%" align="left">
                    </hr>
                </div>

                <body>

                </body>


            </main>
            {/*-----------------------------------------------------------------*/}
            <footer className={styles.footer}>



            </footer>
        </div>
    )
}