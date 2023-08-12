const ui = {
  libraryContainer: document.getElementById('library-container-el'),
  addBookButton: document.querySelector('.add-book-btn'),
  removeAllBooksButton: document.querySelector('.remove-all-btn'),
  dialog: document.querySelector('#add-book-dialog'),
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

const myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Read'),
  new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, 'Read'),
  new Book('The NeverEnding Story', 'Michael Ende', 368, 'Read'),
  new Book(
    'Little Bets: How Breakthrough Ideas Emerge from Small Discoveries',
    'Peter Sims',
    189,
    'Not Read'
  ),
];

function addToLibrary(book) {
  myLibrary.unshift(book);
  displayBooks(myLibrary);
}

function removeAllBooks() {
  myLibrary.length = 0;
  displayBooks(myLibrary);
}

function createBookElement(book) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book', 'card');
  const bookIndex = myLibrary.indexOf(book);
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
  removeButton.textContent = 'Remove';
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

  removeBookFromLibrary();
  changeReadStatus();
}

function changeReadStatus() {
  ui.libraryContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('change-read-status')) {
      const bookDiv = target.closest('.card');
      const bookIndex = parseInt(bookDiv.getAttribute('data-index'));
      const bookStatus = bookDiv.querySelector('.book-status');

      myLibrary[bookIndex].isRead =
        myLibrary[bookIndex].isRead === 'Read' ? 'Not Read' : 'Read';
      bookStatus.textContent = myLibrary[bookIndex].isRead;
    }
  });
}

// function removeBookFromLibrary() {
//     ui.libraryContainer.addEventListener('click', (event) => {
//         const target = event.target;
//         if (target.classList.contains('remove-book')) {
//             const bookDiv = target.closest('.card');
//             const bookIndex = parseInt(bookDiv.getAttribute('data-index'));
//
//             myLibrary.splice(bookIndex, 1);
//             displayBooks(myLibrary);
//         }
//     });
// }

function removeBookFromLibrary() {
  const libraryContainer = ui.libraryContainer;
  const bookDivs = libraryContainer.querySelectorAll('.card');
  for (let i = 0; i < bookDivs.length; i++) {
    const bookCard = bookDivs[i];
    const removeButton = bookCard.querySelector('.remove-book');
    removeButton.addEventListener('click', function () {
      // Get the book index from the data-index attribute of the book card
      const bookIndex = parseInt(bookCard.getAttribute('data-index'));

      // Remove the book card from the DOM
      bookCard.remove();

      // Remove the book object from the myLibrary array
      myLibrary.splice(bookIndex, 1);

      console.log(`Book ${bookIndex} removed`);
    });
  }
}

function main() {
  ui.addBookButton.addEventListener('click', () => {
    ui.addBookDialog.showModal();
  });

  ui.formCancelButton.addEventListener('click', () => {
    ui.dialog.close();
  });

  ui.formSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const bookName = document.querySelector('#book-name').value;
    const bookAuthor = document.querySelector('#book-author').value;
    const bookPages = document.querySelector('#book-pages').value;
    const bookIsRead = ui.readStatusInput.checked ? 'Read' : 'Not Read';

    const book = new Book(bookName, bookAuthor, bookPages, bookIsRead);
    addToLibrary(book);
    ui.addBookDialog.close();
  });

  ui.removeAllBooksButton.addEventListener('click', () => {
    removeAllBooks();
  });

  removeBookFromLibrary();

  displayBooks(myLibrary);
}

main();
