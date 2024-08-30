import {
  TbActivity,
  TbLayoutDashboardFilled,
  TbLogout,
  TbUser
} from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { Logout, reset } from '../features/Authslice'

const Sidebar = ({ isOpen, activeLink, setActiveLink, closeSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(state => state.auth)
  const { isError } = useSelector(state => state.auth)

  const logout = () => {
    dispatch(Logout())
    dispatch(reset())
    navigate('/')
  }

  const navbar = [
    {
      id: 1,
      title: 'Dashboard',
      link: '/dashboard',
      icon: <TbLayoutDashboardFilled />
    },
    // Kondisi ini memungkinkan item Users hanya muncul jika role user adalah 'admin'
    ...(user && user.role === 'admin'
      ? [
          {
            id: 2,
            title: 'Users',
            link: '/users',
            icon: <TbUser />
          }
        ]
      : []),
    {
      id: 3,
      title: 'Products',
      link: '/products',
      icon: <TbActivity />
    }
  ]

  return (
    <div
      className={`fixed inset-0 z-30 lg:m-4 my-4 mr-4 rounded-r-lg lg:rounded-xl lg:static lg:block lg:w-64 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white shadow-lg lg:translate-x-0`}
    >
      <div className='flex items-center justify-between p-4'>
        <h1 className='text-xl font-semibold'>Dashboard</h1>
        <button
          onClick={closeSidebar}
          className='text-gray-600 focus:outline-none lg:hidden'
        >
          &times;
        </button>
      </div>
      <nav className='p-4'>
        {navbar.map(item => (
          <NavLink
            key={item.id}
            to={item.link}
            className={`flex py-2 px-4 cursor-pointer items-center justify-start rounded-lg hover:bg-blue-100 ${
              activeLink === item.title ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => setActiveLink(item.title)} // Set the active item.title on click
          >
            <span className='mr-4'>{item.icon}</span>
            {item.title}
          </NavLink>
        ))}
        <button
          type='button'
          className={`flex py-2 px-4 cursor-pointer items-center justify-start rounded-lg hover:bg-blue-100`}
          onClick={logout} // Set the active item.title on click
        >
          <span className='mr-4'>
            <TbLogout />
          </span>
          Logout
        </button>
      </nav>
    </div>
  )
}
export default Sidebar
