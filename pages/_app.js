import '../styles/globals.css'
import Link from "next/link";
import SideBar from "../components/SideBar"
import {useRouter} from "next/router";
import Head from "next/head";



function MyApp({ Component, pageProps }) {

    const router1 = useRouter()

  return (
      <div>
          <Head>
              <title>Ramsay</title>
              <meta name="description" content="SoulsLikeRiddles" />
              <meta name="google-site-verification" content="GrluTaJ8JkpKMlhlsAJSLxNfGzmqft_FFBitZfUgWhk" />
              <link rel="icon" href="/favicon.ico" />
              


          </Head>


        <Component {...pageProps}  router = {router1}/>

      </div>
  )
}

export default MyApp
