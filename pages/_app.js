import '../styles/globals.css'
import Link from "next/link";
import SideBar from "../components/SideBar"

function MyApp({ Component, pageProps }) {
  return (
      <div>

        <SideBar/>

        <Component {...pageProps} />

      </div>
  )
}

export default MyApp
