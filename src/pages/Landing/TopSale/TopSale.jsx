import React from 'react'
import { products } from '../../../assets/data/mock/products'
import ProductCard from '../../../components/ProductCards/ProductCard'
import shopping from "../../../assets/images/shopping.png";

const TopSale = () => {
  return (
    <div className="container my-20">
      <div className="flex flex-col items-center justify-center">
        <img src={shopping} alt="" className="h-16 w-16 object-contain mb-2" />
        <h2 className="text-4xl font-bold flex items-end gap-3">
          Top Sale Products
        </h2>
        <div className="border-gray-700 border-2 w-40 mt-5"></div>
      </div>
      <div className="mt-12 grid grid-cols-5 gap-8">
        {products?.slice(4,9)?.map((data, i) => (
          <ProductCard key={i} data={data} />
        ))}
      </div>
    </div>
  )
}

export default TopSale