import Head from "next/head";
import styles from "../styles/Home.module.css";
import Game from "../components/Game"

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
        <Game n = "6"/>
    )
}