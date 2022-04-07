import React, { connectHits } from 'react-instantsearch-dom';

import api from '../../../services/api.service';
import { useCart } from '../../../hooks/cart.hook';

import Button from 'components/Button';
import styles from './hits.module.css';

function Hits ({ hits }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const buffHits = hits.map((hit) => {
    const h = { ...hit };

    const hasItem = !!(cart.items.find(({ id }) => id === hit.objectID));
    if (hasItem) {
      h.cta__text = 'Supprimer du panier';
      h.cta__click = function () {
        removeFromCart(hit.objectID);
      }
    } else {
      h.cta__text = 'Ajouter au panier';
      h.cta__click = function () {
        addToCart(hit.objectID);
      }
    }

    return h;
  });

  return (
    <ul className={styles.list}>
      {buffHits.map(hit => (
        <li key={hit.objectID} className={styles.item}>
          <figure className={styles.image__container}>
            <img src={hit.image} alt={hit.name} />
          </figure>

          <h3 className={styles.item__name}>
            {hit.name}
          </h3>

          <footer className={styles.item__footer}>
            <span className={styles.item__price}>
              {hit.salePrice}
            </span>

            <Button onClick={hit.cta__click}>
              {hit.cta__text}
            </Button>
          </footer>
        </li>
      ))}
    </ul>
  );
}

export default connectHits(Hits);
