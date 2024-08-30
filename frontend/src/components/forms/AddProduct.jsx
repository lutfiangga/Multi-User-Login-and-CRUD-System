import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getMe } from '../../features/Authslice'
import axios from 'axios'

const AddProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [msg, setMsg] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      navigate('/')
    }
  }, [isError, navigate])

  const apiUrl = import.meta.env.VITE_PRIVATE_API_URL

  const saveProduct = async e => {
    e.preventDefault()
    try {
      await axios.post(`${apiUrl}/products`, {
        name: name,
        price: price
      });
      navigate('/products')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <section className='hero w-full bg-gray-900 items-center h-dvh my-auto flex justify-center'>
      <div className='body'>
        <div className='container'>
          <div className='flex flex-col w-96'>
            <div className='w-full max-w-lg mx-auto'>
              <form
                onSubmit={saveProduct}
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
              >
                <div className='px-6 py-3 bg-red-600 w-full'>
                  <p className='text-white font-bold'>{msg}</p>
                </div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='name'
                  >
                    Name
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
                    id='name'
                    type='text'
                    placeholder='name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='price'
                  >
                    Price
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
                    id='price'
                    type='number'
                    placeholder='price'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <Link
                    to={'/products'}
                    className='bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  >
                    Back
                  </Link>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='submit'
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
            <p className='text-center text-gray-500 text-xs'>
              &copy;2024 Luphiee. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddProduct
