import { useState, useCallback, useEffect } from 'react';

const usePagination = (storageKey, limit = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(() => {
    setLoading(true);
    try {
      
      const allData = JSON.parse(localStorage.getItem(storageKey)) || [];
      
      
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;
      
      
      const paginatedData = allData.slice(startIndex, endIndex);
      
      setData(paginatedData);
      setError(null);
    } catch (err) {
      setError('Error loading data from localStorage');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [storageKey, currentPage, limit]);

  const goToPage = useCallback((pageNumber) => {
    
    const allData = JSON.parse(localStorage.getItem(storageKey)) || [];
    const totalPages = Math.ceil(allData.length / limit);
    
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  }, [storageKey, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    currentPage,
    goToPage,
    fetchData,
    totalItems: (JSON.parse(localStorage.getItem(storageKey)) || []).length
  };
};

export default usePagination;