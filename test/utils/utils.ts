import server from "../../server";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import Book from "../../models/book";

chai.use(chaiHttp);

async function postBook(book) {
  const response = await chai.request(server).post("/book").send(book);
  return response;
}

export { postBook, Book, chai, expect, server };
