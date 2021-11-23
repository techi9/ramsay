import '../styles/globals.css'
import Link from "next/link";
import SideBar from "../components/SideBar"

let ind = 0

function PageChanged(index){
    console.log("")
    ind = index
}

function MyApp({ Component, pageProps }) {

  return (
      <div>

        <SideBar index ={ind}/>

        <Component {...pageProps} PageUpdated = {PageChanged}/>

      </div>
  )
}

export default MyApp
