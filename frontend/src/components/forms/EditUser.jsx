import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getMe } from '../../features/Authslice'
import axios from 'axios'

const EditUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [role, setRole] = useState('')
  const [msg, setMsg] = useState('')

  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError, user } = useSelector(state => state.auth)

  // Pindahkan deklarasi apiUrl ke bagian atas
  const apiUrl = import.meta.env.VITE_PRIVATE_API_URL

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      navigate('/')
    }

    if (user && user.role !== 'admin') {
      navigate('/dashboard')
    }
  }, [isError, user, navigate])

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/${id}`)
        setName(response.data.name)
        setEmail(response.data.email)
        setRole(response.data.role)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg)
        }
      }
    }
    getUserById()
  }, [id])

  const updateUsers = async e => {
    e.preventDefault()
    try {
      await axios.patch(`${apiUrl}/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role
      })
      navigate('/users')
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
                onSubmit={updateUsers}
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
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline'
                    id='email'
                    type='email'
                    placeholder='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='password'
                  >
                    Password
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    id='password'
                    type='password'
                    placeholder='******************'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='confpassword'
                  >
                    Confirm Password
                  </label>
                  <input
                    className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    id='confpassword'
                    type='password'
                    placeholder='******************'
                    value={confPassword}
                    onChange={e => setConfPassword(e.target.value)}
                  />
                  <p className='text-red-500 text-xs italic'>{msg}</p>
                </div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='role'
                  >
                    Role
                  </label>
                  <select
                    name='role'
                    id='role'
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                    value={role} // Menambahkan value untuk select
                    onChange={e => setRole(e.target.value)} // Menambahkan onChange handler
                  >
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                  </select>
                </div>

                <Link to={'/'} className='mb-4'>
                  Sudah Punya Akun?
                </Link>
                <div className='flex items-center justify-between'>
                  <Link
                    to={'/users'}
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

export default EditUser
