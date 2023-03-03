import Head from "next/head";
import {Header} from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Amazon 1.0</title>
      </Head>

     <Header/>
    </div>
  );
}
