import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

/* 
  searchItems - array of items to search through
  keys - array of keys to search by
*/

export const useSearch = (searchItems, keys) => {
  const [term, setTerm] = useState('');

  const searchResult = useMemo(() => {
    if (term === '') return [];

    const fuse = new Fuse(searchItems, {
      keys,
      threshold: 0.3,
      shouldSort: true,
    });

    return fuse.search(term);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const handleSearch = (searchTerm) => {
    setTerm(searchTerm);
  };

  return [searchResult, setTerm, handleSearch];
};
