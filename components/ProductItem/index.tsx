import { memo, useState } from 'react';
import dynamic from 'next/dynamic';
import lodash from 'lodash';

import { AddProductToWishlistProps } from '../AddProductToWishlist/index';

import styles from './styles.module.css';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('../AddProductToWishlist/index').then(mod => mod.AddProductToWishlist);
},{
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist}: ProductItemProps) {
  const [isAddingToWishlist ,setIsAddingToWishlist] = useState(false);

  return (
    <div className={styles.div}>
      <p>{product.title} - <strong>{product.priceFormatted}</strong></p>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

      { isAddingToWishlist && (
        <AddProductToWishlist 
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)} 
        />
      )}
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product);
});