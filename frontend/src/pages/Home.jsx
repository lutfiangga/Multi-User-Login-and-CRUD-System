import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/Authslice'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import Content from '../components/Content'

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Dashboard')

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState)
  }

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError, user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      navigate('/')
    }
  }, [isError, navigate])

  return (
    <div className='min-h-screen bg-blue-50 text-gray-800 flex'>
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar} // Pass the closeSidebar function
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />

      {isSidebarOpen && (
        <div
          className='fixed inset-0 z-20 bg-black opacity-50 lg:hidden'
          onClick={closeSidebar} // Ensure the overlay also closes the sidebar
        ></div>
      )}

      <div className='flex-1'>
        <Navbar onSidebarToggle={toggleSidebar} />
        selamat datang {user && user.name}
        <Content />
      </div>
    </div>
  )
}

export default Home
