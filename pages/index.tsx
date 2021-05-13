import { FormEvent, useCallback, useState } from 'react';

import { SearchResults } from '../components/SearchResults';

import styles from '../styles/Home.module.css';

type Results = {
  totalPriceFormatted: string;
  data: any[];
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPriceFormatted: '',
    data: []
  });
  
  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted:formatter.format(product.price)
      }
    })

    const totalPriceFormatted = formatter.format(data.reduce((total, product) => {
      return total + product.price;
    }, 0));

    setResults({ totalPriceFormatted, data: products});
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <main className={styles.container}>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Busque por um produto"
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults 
        results={results.data}
        totalPriceFormatted={results.totalPriceFormatted} 
        onAddToWishlist={addToWishlist}
      />
    </main>
  )
}
