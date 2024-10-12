import express,{Router} from "express"
import { addBooks,updateBook,deleteBook,getBooks } from "../controllers/books.controller.js"

const router=Router()

router.route("/").get(getBooks);
router.route("/").post(addBooks);
router.delete("/:id",deleteBook);
router.put("/:id",updateBook);

export default router;