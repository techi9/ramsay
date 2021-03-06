import styles2 from "../styles/colorSelector.module.css";
import Lvl4Game from "../components/lvl4Game";
import SideBar from "../components/SideBar";
import styles from "../styles/colorSelector.module.css";

function GetText(){

    return (
        <p>
            <font size={+7} color={"#646363"} face={"century schoolbook"}>
                <strong>Теоретическая справка</strong>
            </font>
            <br/>
            <font size={+4} FACE={"century schoolbook"}>
               <p>
                   Давайте вспомним самую первую головоломку на графе К6. Нужно было 2-раскрасить граф так, чтобы не
                   образовались одноцветные треугольники. Но позже Вы узнали о том, что если граф К6 2-раскрасить, то
                   обязательно найдутся по крайней мере два одноцветных треугольника.
               </p>
                <p>Возникает интересный вопрос: какого же наименьшее число одноцветных треугольников, которые
                получаются при 2-раскраске графа с n вершинами?
                На этот вопрос первым ответил А. В. Гудман.
                </p>
                <p>Рассмотрим формулы, которые он вывел:</p>

                <div className={styles.highlight}>
                    <p>если n = 2k, то наименьшее число одноцветных треугольников равно <font size={+5}>⅓</font> • k(k − 1)(k - 2)</p>

                    <p>если n = 4k + 1, то наименьшее число одноцветных треугольников равно <font size={+5}>⅓</font> • 2k(k - 1)(k + 1)</p>

                    <p>если n = 4k + 3, то наименьшее число одноцветных треугольников равно <font size={+5}>⅓</font> • 2k(k + 1)(4k - 1)</p>
                </div>

                <p>Давайте проверим эти формулы. Так в первой головоломке, получается, n = 6, то есть это первый случай,
                в котором k = 6 : 2 = 3. Тогда наименьшее число одноцветных треугольников равно
                <font size={+5}>⅓</font> • 3 • (3-1)(3-2) = 2.
                    Всё сошлось.</p>

                {/*<p>А какого наименьшее число для графа К7? Получается, что n = 7 – это третий случай, в котором k = 1.
                Следовательно, по формулам наименьшее число одноцветных треугольников равно
                <font size={+5}> ⅓</font> • 2•1•(1 + 1)(4•1 - 1) = 4.
                    Попробуем в этом убедиться.</p>

                <p><strong>Ваша задача</strong>: 2-раскрасить полный граф с 7-ю вершинами так,
                    чтобы не получилось синих треугольников и
                    получилось не более четырёх красных треугольников.</p>*/}
            </font>
        </p>
    )
}

export default function lvl4(props) {

    const router = props.router

    return (
        <div>
            <SideBar selected = {5}/>
            <Lvl4Game n = "7" Text = {GetText}/>
            <input className={styles2.buttonNext3} type="button" value="Продолжить" onClick={() => router.push('/lvl5')}/>
        </div>
    )
}
