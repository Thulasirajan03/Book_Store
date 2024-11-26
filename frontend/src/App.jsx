import { Routes, Route , BrowserRouter,Link} from 'react-router-dom';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Landing from './pages/Landing'
import Login from './pages/Login'
import CustomerHome from './pages/CustomerHome';
import Register from './pages/Register';
import Home from './pages/Home'
import Cart from './pages/Cart'
import WishList from './pages/WishList';
import DeleteWishList from './pages/DeleteWishList';



const App = () => {
  return (
    <div>
    <BrowserRouter>
    <nav>
    <ul>
      <li><Link to={"/"}>Home</Link></li>
      <li><Link to={"/register"}>Register</Link></li>
      <li><Link to={"/login"}>Login</Link></li>
    </ul>
  </nav>
    <Routes>
      <Route path='/books/wishlist' element={<WishList/>}/>
      <Route path='/books/deletewishlist/:id' element={<DeleteWishList/>}/>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home/>} />
      <Route path='/customerhome' element={<CustomerHome />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route path='/books/cart/:id' element={<Cart />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
