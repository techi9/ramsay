import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import sidebar from "../styles/sidebar.module.css";
import {router} from "next/client";
import {useRouter} from "next/router";


function nextt(e){
    e.preventDefault()
    router.push("/lvl1")
}

export default function Home() {
    const router = useRouter()

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
                  <font size={+6} color={"#808080"} face={"century schoolbook"}>
                      <strong>Рамсеевская теория графов</strong>
                  </font>

              </h1>
              <hr noshade width="98%" align="left">
              </hr>
          </div>

          <font size={+4} FACE={"century schoolbook"}>
              Википедия утверждает, что «Теория Рамсея — это раздел математики,
              изучающий условия, при которых в произвольно формируемых математических
              объектах обязан появиться некоторый порядок». Казалось бы, причём
              здесь графы и о каких играх может идти речь?<br/>
              Однако всё намного интереснее, чем кажется на первый взгляд.
              Очевидно, что если Вы хотите освоить какую-либо тему, стоит начать
              с базовых вещей, поэтому начнём с теории, необходимой для понимания
              общей картины.
              <br/> <br/>
              Что же из себя представляет граф?
              <strong> Граф</strong> — это геометрическая фигура, состоящая из точек,
              которые соединяются между собой линиями. Точки принято называть
              вершинами графа, а линии — рёбрами. При этом значение имеет
              только сам факт наличия связи между двумя вершинами либо её
              отсутствие.
              <br/> <br/>
              <img src={"/G1.png"} hspace={"380px"} height={"250px"}/>
              <br/> <br/>
              Рёбра бывают <em>ориентированным</em> и <em>неориентированным</em>.
              Различие в том, что в первом случае мы можем добраться из
              пункта A в пункт B, однако обратно вернуться не сможем.
              Для неориентированного ребра такого
              ограничения нет, поэтому пройдя из пункта A в пункт B,
              мы можем вернуться обратно в пункт A.
              <br/> <br/>
              <img src={"/G2.png"} hspace={"380px"} height={"250px"}/>
              <br/> <br/>
              Стоит сразу же уточнить, что в тех задачах и примерах, которые
              мы будем рассматривать, ориентированность графа не нужна, поэтому
              линией будем называть двунаправленное(неориентированное) ребро.
              <br/> <br/>
              Так же для решения задач нам понадобится определение полного графа.
              Итак, если каждая из n вершин соединена линией с каждой другой вершиной,
              то граф называется <strong> полным графом с n вершинами</strong>.
              Его принято обозначать как Kn. Стоит отметить, что для нас неважно,
              как именно расположены вершины и проведены линии.
              <br/> <br/>
              Рассмотрим примеры полных графов:
              <br/> <br/>
              <img src={"/G3.png"} hspace={"180px"} height={"250px"}/>
              <br/> <br/>
          </font>

          {/*<div className={<button disabled></button>}>*/}

          <input className={styles.buttonNext} type="button" value="Продолжить" onClick={nextt}/>


          <body>


          </body>


      </main>
      {/*-----------------------------------------------------------------*/}
      <footer className={styles.footer}>



      </footer>
    </div>
  )
}
