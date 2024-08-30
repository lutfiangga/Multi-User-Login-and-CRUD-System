import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const apiUrl = import.meta.env.VITE_PRIVATE_API_URL

  const Register = async e => {
    e.preventDefault()
    console.log(name, email, password, confPassword)
    try {
      await axios.post(`${apiUrl}/users`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword
      })
      navigate('/')
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
                onSubmit={Register}
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
              >
                {/* <div className='px-6 py-3 bg-red-600 w-full'>
                  <p className='text-white font-bold'>{msg}</p>
                </div> */}
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
                  {/* <p className='text-red-500 text-xs italic'>
                    Please choose a password.
                  </p> */}
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
                  <p className='text-red-500 text-xs italic'>
                    {msg}
                  </p>
                </div>
                 <Link to={'/'} className='mb-4'>Sudah Punya Akun?</Link>
                <div className='flex items-center justify-between'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-
                            2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='submit'
                  >
                    Sign Up
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

export default Register
