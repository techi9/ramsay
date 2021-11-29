import '../styles/globals.css'
import Link from "next/link";
import SideBar from "../components/SideBar"
import {useRouter} from "next/router";



function MyApp({ Component, pageProps }) {

    const router1 = useRouter()

  return (
      <div>

        <SideBar/>

        <Component {...pageProps}  router = {router1}/>

      </div>
  )
}

export default MyApp
