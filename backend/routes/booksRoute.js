import express from 'express';
import { Book } from '../models/bookModel.js';
import {userModel} from '../models/userSchema.js';
import multer from 'multer'


const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Route for Save a new Book
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const newBook = new Book({
      title,
      author,
      publishYear,
      imageUrl: req.file ? req.file.path : null, // Save image path
    });

    const book = await newBook.save();
    return res.status(201).send(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post('/cart/:id',async(req,res)=>{
  try{
  const {id} = req.params;
  const newBook = await Book.findById(id);
  newBook.cart = true;
  console.log("ID"+newBook)
  const book = await Book.findByIdAndUpdate(id,newBook);
  return res.status(201).send(book);
} catch (error) {
  console.log(error.message);
  res.status(500).send({ message: error.message });
}
})

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    console.log("Book : "+book)

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.post

// Route for Update a Book
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for Delete a book from wishlist
router.put('/deletewishlist/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const newBook = await Book.findById(id);
    newBook.cart = false;
    console.log("ID"+newBook)
    const book = await Book.findByIdAndUpdate(id,newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


router.post('/register',async (req,res) => {
  try{
      const userExists = await userModel.findOne({email:req.body.email});
      if(userExists){
          return res
          .status(200)
          .send({message:"User already exists",success:false})
      }
      const newUser = new userModel(req.body)
      await newUser.save();
      return res.status(201).send({message:"User registered successfully",success:true});
  }
  catch(err){
      console.log(err);
      return res.status(500).send({message:err.message,success:false});
  }
});

router.post('/login',async (req,res) =>{
  const {email,password,role} = req.body;
  userModel.findOne({email : email}).then(user=>{
      if(user){
          if(user.password===password && user.role === role){
              res.status(201).send({message:"Login successfull",success:true});
          }
          else{
              res.status(200).send({message:"Invalid Password",success:false})
          }
      }
      else{
          res.status(500).send({message:"Invalid Email",success:false})
      }
  })
});




export default router;
