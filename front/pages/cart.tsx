import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Configure } from "react-instantsearch-dom";

import { useCart } from '../hooks/cart.hook';

import Hits from '../components/cart/Hits';

export default function Cart () {
  const { cart } = useCart();

  const algoliaConfig = {
    filters: cart.items.reduce((acc, { id }, i) => {
      if (i > 0) acc+= ' OR ';
      acc += `objectID:${id}`
      return acc;
    }, ''),
  };

  const hasItems = !!cart.items.length;

  return (
    <div className={styles.container}>
      <Configure {...algoliaConfig} />
      <Head>
        <title>La Fourche: cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        Cart
      </h1>
      {hasItems
        && (<Hits />)
        || (<span>
              no items in cart
            </span>)
      }

    </div>
  );
}
