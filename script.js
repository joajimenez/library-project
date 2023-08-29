import { ui } from './ui.js';
import { handleReadStatus, handleRemoveBook } from './utils.js';

class Book {
  constructor(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

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

const libreria = new Library();

// Add some books to the library

libreria.addBook(new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Read'));

libreria.addBook(
  new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, 'Read')
);

libreria.addBook(
  new Book('The NeverEnding Story', 'Michael Ende', 368, 'Read')
);

libreria.addBook(
  new Book(
    'Little Bets: How Breakthrough Ideas Emerge from Small Discoveries',
    'Peter Sims',
    189,
    'Not Read'
  )
);

libreria.addBook(
  new Book('The Catcher in the Rye', 'J.D. Salinger', 273, 'Unread')
);
libreria.addBook(
  new Book('The Great Gatsby', 'F. Scott Fitzgerald', 189, 'Plan to read')
);
libreria.addBook(new Book('To Kill a Mockingbird', 'Harper Lee', 336, 'Read'));
libreria.addBook(new Book('1984', 'George Orwell', 328, 'Plan to read'));

libreria.addBook(new Book('Don Quixote', 'Miguel de Cervantes', 900, 'Read'));

console.log(libreria.bookshelf); // Check the library

function createBookElement(book) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book', 'card');

  const bookIndex = libreria.bookshelf.indexOf(book);
  bookDiv.setAttribute('data-index', bookIndex.toString());

  const bookName = document.createElement('h2');
  bookName.textContent = book.name;

  const bookAuthor = document.createElement('h3');
  bookAuthor.textContent = book.author;

  const bookPages = document.createElement('p');
  bookPages.classList.add('book-pages');
  bookPages.textContent = `Pages: ${book.pages}`;

  const bookIsRead = document.createElement('p');
  bookIsRead.classList.add('book-is-read');
  bookIsRead.textContent = 'Status: ';

  const bookStatus = document.createElement('span');
  bookStatus.classList.add('book-status');
  bookStatus.textContent = book.isRead;
  bookIsRead.appendChild(bookStatus);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('book-el-buttons-container');

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove Book';
  removeButton.classList.add('remove-book');

  const changeStatusButton = document.createElement('button');
  changeStatusButton.textContent = 'Change Read Status';
  changeStatusButton.classList.add('change-read-status');

  buttonsContainer.appendChild(removeButton);
  buttonsContainer.appendChild(changeStatusButton);

  bookDiv.appendChild(bookName);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookPages);
  bookDiv.appendChild(bookIsRead);
  bookDiv.appendChild(buttonsContainer);

  return bookDiv;
}

// Let's refactor the removeBookFromLibrary function to use event propagation

function setupEventListeners() {
  ui.libraryContainer.addEventListener('click', (event) => {
    const target = event.target;
    // Check if the clicked element is the remove button
    if (target.classList.contains('remove-book')) {
      handleRemoveBook(target);
    }

    if (target.classList.contains('change-read-status')) {
      handleReadStatus(target);
    }
  });
}

function displayBooks(arr) {
  ui.libraryContainer.innerHTML = '';
  arr.forEach((book) => {
    const bookDiv = createBookElement(book);
    ui.libraryContainer.appendChild(bookDiv);
  });
}

function main() {
  ui.addBookButton.addEventListener('click', () => {
    ui.addBookDialog.showModal();
  });

  ui.formCancelButton.addEventListener('click', () => {
    ui.addBookDialog.close();
  });

  ui.formSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const bookName = document.querySelector('#book-name').value;
    const cleanBookName = DOMPurify.sanitize(bookName);

    const bookAuthor = document.querySelector('#book-author').value;
    const cleanBookAuthor = DOMPurify.sanitize(bookAuthor);

    const bookPages = document.querySelector('#book-pages').value;
    const cleanBookPages = DOMPurify.sanitize(bookPages);

    const bookIsRead = ui.readStatusInput.checked ? 'Read' : 'Not Read';

    if (cleanBookName === '') {
      alert('Please enter a book name');
      return;
    } else if (cleanBookAuthor === '') {
      alert('Please enter an author name');
      return;
    } else if (cleanBookPages === '') {
      alert('Please enter the number of pages');
      return;
    } else if (bookIsRead === '') {
      alert('Please enter the book status');
      return;
    }

    const book = new Book(
      cleanBookName,
      cleanBookAuthor,
      cleanBookPages,
      bookIsRead
    );

    libreria.addBook(book);
    ui.addBookDialog.close();

    ui.addBookForm.reset();
  });

  ui.removeAllBooksButton.addEventListener('click', () => {
    // removeAllBooks();

    libreria.deleteAllBooks();
  });

  setupEventListeners();
  displayBooks(libreria.bookshelf);
}

main();
