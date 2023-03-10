import Head from "next/head";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 1.0</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Product feed */}
        {products.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <ProductFeed products={products} />
        )}
      </main>
    </div>
  );
}