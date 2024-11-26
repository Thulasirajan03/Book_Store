import  { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import WishListTable from '../components/home/WishListTable';

const WishList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const isSeller = true;
  const wishlist = true;

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books/')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Wish List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) :  (
        <WishListTable books={books} seller={isSeller} wishlist={wishlist}  />
      ) }
    </div>
  );
};

export default WishList;
