import { Books } from "../models/books.models.js";

const getBooks = async (req, res) => {
  const books = await Books.find();
  console.log(books);
  res.json(books);
};

const addBooks = async (req, res) => {
  const { title, author, category, price, stock, description } = req.body;
  console.log(req.body);
  const newBook = new Books({
    title,
    author,
    category,
    price,
    stock,
    description,
  });
  await newBook.save();
  res.json(newBook);
  console.log(`book added: ${newBook}`)
};

const updateBook = async (req, res) => {
  const book = await Books.findById(req.params.id);
  if (book) {
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.category = req.body.category || book.category;
    book.price = req.body.price || book.price;
    book.stock = req.body.stock || book.stock;
    await book.save();
    res.json(book);
    console.log(`book updated: ${book}`);
  }else{
    res.status(404).json({message:'book not found'});
  }
};

const deleteBook=async(req,res)=>{
    const book=await Books.findById(req.params.id);
    if (book){
        await book.remove();
        console.log(`book removed: ${book}`);
        res.json({message:"book removed"});
    }else{
        res.status(404).json({message:'Book not found'});
    }
}
export {addBooks,updateBook,deleteBook,getBooks};
