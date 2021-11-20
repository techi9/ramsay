import '../styles/globals.css'
import Link from "next/link";
import sidebar from "../styles/sidebar.module.css"

function MyApp({ Component, pageProps }) {
  return (
      <div>

        <div className={sidebar.sidebar}>
          <Link href={"/"}>
            <a >Введение в теорему</a>
          </Link>
          <Link href={"/lvl1"}>
            <a >Критичесский граф</a>
          </Link>
          <Link href={"/"}>
            <a >Дальше идут вроде </a>
          </Link>

        </div>

        <Component {...pageProps} />

      </div>
  )
}

export default MyApp
