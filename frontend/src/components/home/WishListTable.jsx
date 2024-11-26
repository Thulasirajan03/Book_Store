import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from 'react-icons/md';

const WishListTable = ({ books }) => {
 
  return (
    <div>
      <Link style={{textDecoration:'none'}} className='text-dark bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' to='/customerhome'>Book List
      </Link>
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Title</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Author
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Publish Year
          </th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        { books.map((book, index) => (
            book.cart === true ? (
          <tr key={book._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {book.title}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.author}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {book.publishYear}
            </td>
             <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                <Link to={`/books/deletewishlist/${book._id}`} style={{display:'flex',textDecoration:'none'}}>
                Delete <MdOutlineDelete className='text-2xl text-red-600' />  
                </Link>
                </div>
              </td>  
          </tr>):(
            <>
            </>
          )
        ))}
      </tbody>
    </table>
    </div>
  );
};

// Add PropTypes validation
WishListTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      publishYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired
  ).isRequired,
  seller: PropTypes.bool.isRequired, // Added validation for seller prop
};

export default WishListTable;
