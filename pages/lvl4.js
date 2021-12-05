import styles2 from "../styles/colorSelector.module.css";
import Lvl4Game from "../components/lvl4Game";

export default function lvl4(props) {

    const router = props.router

    return (
        <div>
            <Lvl4Game n = "7" />
            <input className={styles2.buttonNext} type="button" value="Продолжить" onClick={() => router.push('/lvl5')}/>
        </div>
    )
}
