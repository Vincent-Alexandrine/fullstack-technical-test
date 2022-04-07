import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';

import Theme from 'Theme';
import { CartProvider } from 'hooks/cart.hook';
import styles from "../styles/Home.module.css";

const INSTANT_SEARCH = {
  indexName: 'bestbuy',
  searchClient: algoliasearch(
    "latency",
    "6be0576ff61c053d5f9a3225e2a90f76"
  ),
};

export default function layout ({ children }) {
  return (
    <Theme>
      <CartProvider>
        <InstantSearch {...INSTANT_SEARCH}>
          <main className={styles.main}>
            {children}
          </main>
        </InstantSearch>
      </CartProvider>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </Theme>
  )
}

layout.propTypes = {
  children: PropTypes.node,
};
