import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { getBooks, deleteBook, getBook, updateBook, postBook } from './routes/book';
import config from './config/config'; //we load the db location from the JSON fils

//db options
const app = express();
const port = 9000;
const options = {};

console.log("config.DBHost", config.DBHost);

mongoose.connect(config.DBHost, options).then(() => {
    console.log("Connected to database ");
},
    err => {
        console.log("Can not connect to the database" + err);
    });

app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.get("/", (req, res) => res.json({ message: "welcome to our Store!" }));
app.route("/book").get(getBooks).post(postBook);
app.route("/book/:id").get(getBook).delete(deleteBook).put(updateBook);
app.listen(port);
console.log("listening on port" + port);

export default app;
