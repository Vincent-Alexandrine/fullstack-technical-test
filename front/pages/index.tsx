import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Configure, SearchBox } from "react-instantsearch-dom";

import Hits from '../components/search/Hits';

const ALGOLIA_CONFIG = {
  hitsPerPage: 20,
};

export default function Home() {
  return (
      <div className={styles.container}>
        <Configure {...ALGOLIA_CONFIG} />
        <Head>
          <title>La Fourche: items' list</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className={styles.title}>
          Welcome to La Fourche Frontend Technical Test v2 !
        </h1>

        <SearchBox />
        <Hits />
      </div>
  );
}
