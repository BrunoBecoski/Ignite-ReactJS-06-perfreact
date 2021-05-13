import { List, ListRowRenderer, AutoSizer } from 'react-virtualized';

import { ProductItem } from '../ProductItem';

import styles from './styles.module.css';

interface SearchResultsProps {
  totalPriceFormatted: string;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>
  onAddToWishlist: (id: number) => void;
}

export function SearchResults({ totalPriceFormatted, results, onAddToWishlist }: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem 
          product={results[index]} 
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  }
  

  return (
    <div className={styles.container}> 
      <div className={styles.info}>
        <h3>Produtos encontrados: <i>{results.length}</i></h3>
        <h3>Preço total: <i>{totalPriceFormatted}</i></h3>
      </div>
      <AutoSizer
        style={{
          height: 'calc(100vh - 15rem)',
        }}
      >
        {({height, width}) => (
          <List 
            height={height}
            width={width}
            rowHeight={50}
            overscanRowCount={5}
            rowCount={results.length}
            rowRenderer={rowRenderer}
          />
        )}
        </AutoSizer> 
    </div>
  )
}