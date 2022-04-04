import Head from "next/head";
import styles from "../styles/Home.module.css";
import algoliasearch from "algoliasearch/lite";
import { Configure, InstantSearch, Hits, SearchBox } from "react-instantsearch-dom";

import { useCart } from '../hooks/cart.hook';

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export default function Cart () {
  const { cart } = useCart();

  const algoliaConfig = {
    filters: cart.items.reduce((acc, { id }, i) => {
      if (i > 0) acc+= ' OR ';
      acc += `objectID:${id}`
      return acc;
    }, ''),
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>La Fourche: cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Cart
        </h1>

        <InstantSearch indexName="bestbuy" searchClient={searchClient}>
          <Configure {...algoliaConfig} />
          <Hits />
        </InstantSearch>
      </main>
    </div>
  );
}
