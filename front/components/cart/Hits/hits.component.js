import React, { connectHits } from 'react-instantsearch-dom';

import { useCart } from '../../../hooks/cart.hook';
import styles from './hits.module.css';

function Hits ({ hits }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const total = hits.reduce((acc, { salePrice }) => acc += salePrice, 0);

  return (
    <div>
      <span className={styles.total}>
        TOTAL: {total}
      </span>

      <ul className={styles.list}>
        {hits.map(hit => (
          <li key={hit.objectID} className={styles.item}>
            <figure>
              <img src={hit.image} alt={hit.name} />
            </figure>

            <h3 className={styles.item__name}>
              {hit.name}
            </h3>

            <footer className={styles.item__footer}>
              <span className={styles.item__price}>
                {hit.salePrice}
              </span>
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default connectHits(Hits);
