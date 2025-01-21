import express from "express";
import {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from "../controllers/bookController";
import {authenticateJWT} from "../middlewares/authMiddleware";
import {validateBook} from "../middlewares/bookValidator";
import {errorHandler} from "../middlewares/errorHandler";
import {apiLimiter} from "../middlewares/reteLimiter";
import {validateBookQueryParams} from "../middlewares/bookQueryValidator";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books with optional filters, sorting, and pagination
 *     description: Retrieve a list of books with optional filtering by title, genre, author, and publication date range. Supports pagination and sorting.
 *     tags:
 *        - Books
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of books per page (default is 10)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, genre, author, publishedDate]
 *           default: title
 *         description: Field to sort books by (default is title)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order (ascending or descending)
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter books by title (supports partial match)
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter books by genre (supports partial match)
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter books by author (supports partial match)
 *       - in: query
 *         name: publishedFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter books published from this date (YYYY-MM-DD)
 *       - in: query
 *         name: publishedTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter books published up to this date (YYYY-MM-DD)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *       403:
 *         description: Forbidden. The user is forbidden due to an invalid token.
 *       500:
 *         description: Internal server error
 */
router.get("/", apiLimiter, authenticateJWT, validateBookQueryParams, getBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags:
 *        - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details
 *       400:
 *         description: Bad Request. The provided ID is invalid.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *       403:
 *         description: Forbidden. The user is forbidden due to invalid token.s
 *       404:
 *         description: Not Found. The book with the specified ID does not exist.
 *       500:
 *         description: Internal server error
 */
router.get("/:id", apiLimiter, authenticateJWT, getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *        - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: fabio_book
 *               author:
 *                 type: string
 *                 example: fabio_author
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-01-01
 *               genre:
 *                 type: string
 *                 example: fantasy
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Bad Request. Validation failed. The request body may be missing required fields or contain invalid data.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *       403:
 *         description: Forbidden. The user is forbidden due to invalid token.
 *       500:
 *         description: Internal server error
 */
router.post("/", apiLimiter, authenticateJWT, validateBook, createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update an existing book
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date-time
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Bad Request. The provided ID is invalid or the request body contains invalid data.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *       403:
 *         description: Forbidden. The user is forbidden due to invalid token.
 *       404:
 *         description: Not Found. The book with the specified ID does not exist.
 *       500:
 *         description: Internal server error
 */
router.put("/:id", apiLimiter, authenticateJWT, updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Bad Request. The provided ID is invalid.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *       403:
 *         description: Forbidden. The user is forbidden due to invalid token.
 *       404:
 *         description: Not Found. The book with the specified ID does not exist.
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", apiLimiter, authenticateJWT, deleteBook);

router.use(errorHandler)

export default router;
