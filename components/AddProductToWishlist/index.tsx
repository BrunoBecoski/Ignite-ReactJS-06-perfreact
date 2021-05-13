import styles from './styles.module.css';

export interface AddProductToWishlistProps {
  onAddToWishlist: () => void;
  onRequestClose: () => void;
}

export function AddProductToWishlist({
  onAddToWishlist,
  onRequestClose
}: AddProductToWishlistProps) {
  return (
    <span className={styles.span}>
      Deseja adicionar aos favoritos?
      <button onClick={onAddToWishlist} className={styles.yes}>Sim</button>
      <button onClick={onRequestClose} className={styles.no}>Não</button>
    </span>
  )
}