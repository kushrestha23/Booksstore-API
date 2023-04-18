import mongoose from "mongoose";
import Book from "../models/book";
import { Request, Response } from "express";

//Get all Books
async function getBooks(req: Request, res: Response) {
    try {
        const books = await Book.find();
        res.status(200).json({ Message: `${books.length} Book Founded`, books });
    } catch (error) {
        res.status(500).json({ Message: "Failed", error });
    }
}

//Retrieve the /book/:id route to retrieve a book given its id.
async function getBook(req: Request, res: Response) {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json(error);
    }
}


//Post /book to save a new book.
async function postBook(req: Request, res: Response) {
    try {
        const book = await Book.create(req.body); //creates the new book
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json(error);
    }
}

//delete the book with the given id if it exists.
async function deleteBook(req: Request, res: Response) {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json(error);
    }
}

//put the book with the given id if it exists.

async function updateBook(req: Request, res: Response) {

    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.title = req.body.title;
            book.author = req.body.author;
            book.year = req.body.year;
            book.pages = req.body.pages;
            const Book = await book.save();
            return res.status(200).json(book);
        }

        res.status(404).json({ message: "Book not found" });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export {
    getBooks,
    getBook,
    postBook,
    deleteBook,
    updateBook
};

