import Lvl3Game from "../components/lvl3Game";
import styles2 from "../styles/colorSelector.module.css";

export default function lvl4(props) {

    const router = props.router

    return (
        <div>
            <Lvl3Game n = "16" />
            <input className={styles2.buttonNext} type="button" value="Продолжить" onClick={() => router.push('/lvl5')}/>
        </div>
    )
}
