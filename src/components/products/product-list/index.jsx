import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../store/productsSlice';
import Product from '../product';

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const total = useSelector((state) => state.products.total); 
  const limit = 30; 

  
  const [currentPage, setCurrentPage] = useState(1);

  
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit })); 
  }, [dispatch, currentPage]);

  
  const totalPages = Math.ceil(total / limit);

  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="products-list">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
