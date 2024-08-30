import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Logout, reset } from '../features/Authslice'

const Navbar = ({ onSidebarToggle }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(state => state.auth)
  const { isError } = useSelector(state => state.auth)

  const logout = () => {
    dispatch(Logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='bg-white shadow-sm mt-4 rounded-l-lg lg:rounded-l-xl p-4 flex items-center justify-between lg:justify-end'>
      <button
        onClick={onSidebarToggle}
        className='lg:hidden text-gray-600 focus:outline-none'
      >
        &#9776;
      </button>
      <div className='flex items-center space-x-4'>
        <input
          type='text'
          placeholder='Search...'
          className='px-4 py-2 border rounded-md'
        />
        <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
        <button
          className={`flex py-2 px-4 cursor-pointer items-center justify-start rounded-lg hover:bg-blue-100`}
          onClick={logout} // Set the active item.title on click
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
