import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ProductList = () => {
  // Data pengguna contoh
  const [product, setProduct] = useState([])
  const apiUrl = import.meta.env.VITE_PRIVATE_API_URL

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    const response = await axios.get(`${apiUrl}/products`)
    setProduct(response.data)
  }

  const deleteProduct = async productId => {
    await axios.delete(`${apiUrl}/products/${productId}`)
    getProduct()
  }

  return (
    <div className='overflow-x-auto'>
      <h1 className='text-2xl font-bold mb-4'>Product List</h1>
      <Link
        to='/products/add'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Add Product
      </Link>
      <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='py-2 px-4 text-left text-gray-600 font-medium'>
              No
            </th>
            <th className='py-2 px-4 text-left text-gray-600 font-medium'>
              Name
            </th>
            <th className='py-2 px-4 text-left text-gray-600 font-medium'>
              Price
            </th>
            <th className='py-2 px-4 text-left text-gray-600 font-medium'>
              Created By
            </th>
            <th className='py-2 px-4 text-left text-gray-600 font-medium'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {product.map((product, index) => (
            <tr key={product.uuid} className='border-t'>
              <td className='py-2 px-4 text-gray-700'>{index + 1}</td>
              <td className='py-2 px-4 text-gray-700'>{product.name}</td>
              <td className='py-2 px-4 text-gray-700'>{product.price}</td>
              <td className='py-2 px-4 text-gray-700'>{product.user.name}</td>
              <td className='py-2 px-4'>
                <Link
                  to={`/products/edit/${product.uuid}`}
                  className='text-blue-500 hover:text-blue-700 font-semibold mr-2'
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.uuid)}
                  type='button'
                  className='text-red-500 hover:text-red-700 font-semibold'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
