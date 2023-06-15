import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust height as needed */
`;

const LoadingText = styled.p`
  font-size: 18px;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://ecommerse-app-api.onrender.com/api/products?category=${cat}`
            : "https://ecommerse-app-api.onrender.com/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        // Handle error if necessary
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 10)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;

// useEffect(() => {
//   const getProducts = async () => {
//     try {
//       const res = await axios.get(
//         cat
//           ? `http://localhost:5000/api/products?category=${cat}`
//           : "http://localhost:5000/api/products"
//       );
//       setProducts(res.data);
//     } catch (err) {}
//   };
//   getProducts();
// }, [cat]);
