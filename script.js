const ui = {
  libraryContainer: document.getElementById('library-container-el'),
  addBookButton: document.querySelector('.add-book-btn'),
  removeAllBooksButton: document.querySelector('.remove-all-btn'),
  addBookDialog: document.querySelector('#add-book-dialog'),
  addBookForm: document.querySelector('#add-book-form'),
  formSubmitButton: document.querySelector('.form-submit-btn'),
  formCancelButton: document.querySelector('.form-cancel-btn'),
  readStatusInput: document.querySelector('#book-is-read'),
};

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

function displayBooks(arr) {
  ui.libraryContainer.innerHTML = '';
  arr.forEach((book) => {
    const bookDiv = createBookElement(book);
    ui.libraryContainer.appendChild(bookDiv);
  });
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

function handleRemoveBook(button) {
  const bookDiv = button.closest('.card');
  const bookIndex = parseInt(bookDiv.getAttribute('data-index'));

  // Remove the book card from the DOM
  bookDiv.remove();

  // Remove the book object from the "libreria" array
  libreria.removeBook(bookIndex);
  console.log(libreria.bookshelf);

  console.log(`Book ${bookIndex} removed`);
}

function handleReadStatus(button) {
  const bookDiv = button.closest('.card');
  const bookIndex = parseInt(bookDiv.getAttribute('data-index'));
  const bookStatus = bookDiv.querySelector('.book-status');

  libreria.bookshelf[bookIndex].isRead =
    libreria.bookshelf[bookIndex].isRead === 'Read' ? 'Not Read' : 'Read';
  bookStatus.textContent = libreria.bookshelf[bookIndex].isRead;
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
    const bookAuthor = document.querySelector('#book-author').value;
    const bookPages = document.querySelector('#book-pages').value;
    const bookIsRead = ui.readStatusInput.checked ? 'Read' : 'Not Read';

    const book = new Book(bookName, bookAuthor, bookPages, bookIsRead);
    // addToLibrary(book);
    libreria.addBook(book);
    ui.addBookDialog.close();
  });

  ui.removeAllBooksButton.addEventListener('click', () => {
    // removeAllBooks();

    libreria.deleteAllBooks();
  });

  setupEventListeners();
  displayBooks(libreria.bookshelf);
}

main();
