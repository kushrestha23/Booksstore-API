process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
// let Book = require('../models/book');
import server from '../server';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Book from '../models/book';



chai.use(chaiHttp);
describe('Books', () => {
    beforeEach(async () => {
        await Book.deleteMany({});
    });

    describe('/GET book', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/book')
                .end((err, res) => {
                    console.log("res", res)
                    expect(res).to.have.status(200);
                    expect(res.body.books).to.be.a('array');
                    expect(res.body.books.length).to.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST book', () => {

        it('it should not POST a book without pages field', (done) => {
            let book = {
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                year: 1677,
                // pages: { type: Number, required: true },
            }

            chai.request(server)
                .post('/book')
                .send(book)
                .end((err, res) => {
                    console.log("res", res)
                    console.log("err", err)
                    expect(res).to.have.status(500);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('errors');
                    expect(res.body.errors).to.have.property('pages');
                    expect(res.body.errors.pages).to.have.property('kind').eql('required');
                    done();
                })
        })

    });
});
