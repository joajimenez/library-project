class Library {
  constructor() {
    this.bookshelf = [];
  }
  addBook(book) {
    this.bookshelf.unshift(book);
    displayBooks(this.bookshelf);
  }

  removeBook(index) {
    this.bookshelf.splice(index, 1);
    displayBooks(this.bookshelf);
  }

  deleteAllBooks() {
    this.bookshelf.length = 0;
    displayBooks(this.bookshelf);
  }
}

class Book {
  constructor(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}
