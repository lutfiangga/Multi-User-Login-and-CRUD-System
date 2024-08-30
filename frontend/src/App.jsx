import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'
import Products from './pages/Products'
import Login from './components/login'
import Register from './components/register'
import AddUser from './components/forms/AddUser'
import EditUser from './components/forms/EditUser'
import AddProduct from './components/forms/AddProduct'
import EditProduct from './components/forms/EditProduct'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/add' element={<AddUser />} />
          <Route path='/users/edit/:id' element={<EditUser />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/add' element={<AddProduct />} />
          <Route path='/products/edit/:id' element={<EditProduct />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
