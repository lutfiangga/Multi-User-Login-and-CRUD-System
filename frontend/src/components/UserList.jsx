import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserList = () => {
  const [users, setUsers] = useState([])
  const apiUrl = import.meta.env.VITE_PRIVATE_API_URL

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get(`${apiUrl}/users`)
    setUsers(response.data)
  }

  const deleteUsers = async userId => {
    await axios.delete(`${apiUrl}/users/${userId}`)
    getUsers()
  }

  return (
    <div className='overflow-x-auto'>
      <h1 className='text-2xl font-bold mb-4'>User List</h1>
      <Link
        to='/users/add'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Add User
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
              Email
            </th>
            <th className='py-2 px-4 text-left text-gray-600 font-medium'>
              Role
            </th>
            <th className='py-2 px-4 text-left text-gray-600 font-medium'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid} className='border-t'>
              <td className='py-2 px-4 text-gray-700'>{index + 1}</td>
              <td className='py-2 px-4 text-gray-700'>{user.name}</td>
              <td className='py-2 px-4 text-gray-700'>{user.email}</td>
              <td className='py-2 px-4 text-gray-700'>{user.role}</td>
              <td className='py-2 px-4'>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className='text-blue-500 hover:text-blue-700 font-semibold mr-2'
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUsers(user.uuid)}
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

export default UserList
