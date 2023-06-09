import { Book, server, chai, expect, postBook } from "./utils/utils";

describe("Books", () => {
  beforeEach(async () => {
    await Book.deleteMany({});
  });

  describe("/GET book", () => {
    //Gets all the list of the books
    it("Should GET all the books", (done) => {
      chai
        .request(server)
        .get("/book")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.books).to.be.a("array");
          expect(res.body.books.length).to.be.eql(0);
          done();
        });
    });

    //Verify that the API returns the correct response code (404)
    //when an invalid request is sent to retrieve a list of books.
    it("Should return the correct response code using invalid requests", (done) => {
      chai
        .request(server)
        .get("/books")
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.books).to.be.undefined;
          done();
        });
    });

    //Verify that the API returns the correct response code (200)
    //when a valid request is sent to retrieve details of a book by its ID.
    it("Should return the valid response with valid request to retrieve details of a book by its ID", async () => {
      const book = {
        title: "Vogue",
        author: "Fred",
        year: 1955,
        pages: 1456,
      };

      const response = await postBook(book);

      chai
        .request(server)
        .get(`/book/${response.body.book["_id"]}`)
        .end((err, res) => {
          expect(res.body.book.title).to.equal(book.title);
          expect(res.body.book.author).to.equal(book.author);
          expect(res.body.book.year).to.equal(book.year);
          expect(res.body.book.pages).to.equal(book.pages);
          expect(res).to.have.status(200);
        });
    });
  });

  describe("/POST book", () => {
    //Should return the error message but test should be passed.
    it("it should not POST a book without pages field", async (done) => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1677,
        // pages: { type: Number, required: true },
      };

      const res = await postBook(book);
      expect(res).to.have.status(500);
      expect(res.body).to.be.a("object");
      expect(res.body).to.have.property("errors");
      expect(res.body.errors).to.have.property("pages");
      expect(res.body.errors.pages).to.have.property("kind").eql("required");
      done();
    });

    //Validatiom that all the data is entered properly:
    it("it should POST a book ", async (done) => {
      let book = {
        title: "Harry Potter 1",
        author: "J.K. Rowling 1",
        year: 1995,
        pages: 223,
      };
      const res = await postBook(book);
      expect(res).to.have.status(201);
      expect(res.body).to.be.a("object");
      expect(res.body)
        .to.have.property("Message")
        .eql("Book successfully added!");
      expect(res.body.book).to.have.property("title");
      expect(res.body.book).to.have.property("author");
      expect(res.body.book).to.have.property("year");
      expect(res.body.book).to.have.property("pages");
      done();
    });
  });
});

export default chai;
