ui = {
  libraryContainer: document.getElementById('library-container-el'),

  addBookButton: document.querySelector('.add-book-btn'),
  removeAllBooksButton: document.querySelector('.remove-all-btn'),

  dialog: document.querySelector('#add-book-dialog'),
  addBookDialog: document.querySelector('#add-book-dialog'),
  addBookForm: document.querySelector('#add-book-form'),
  formSubmitButton: document.querySelector('.form-submit-btn'),
  formCancelButton: document.querySelector('.form-cancel-btn'),
};

let myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Read'),
  new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, 'Read'),
  new Book('The NeverEnding Story', 'Michael Ende', 368, 'Read'),

    new Book('Little Bets: How Breakthrough Ideas Emerge from Small Discoveries', 'Peter Sims', 189, 'Not Read')
];

function Book(name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Main functions
function addToLibrary(book) {
  myLibrary.unshift(book);
}

function removeAllBooks() {
  myLibrary = [];
  displayBooks(myLibrary);
}

function displayBooks(arr) {
  ui.libraryContainer.innerHTML = '';
  arr.forEach((book) => {
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.classList.add('card');
    bookDiv.setAttribute('data-index', myLibrary.indexOf(book).toString());
    let bookName = document.createElement('h2');
    bookName.textContent = book.name;
    let bookAuthor = document.createElement('h3');
    bookAuthor.textContent = book.author;

    let bookPages = document.createElement('p');
    bookPages.classList.add('book-pages');
    bookPages.setAttribute('data-pages', book.pages);
    bookPages.textContent = 'Pages: ';
    let bookPagesAmount = document.createElement('span');
    bookPagesAmount.textContent = book.pages;
    bookPages.appendChild(bookPagesAmount);

    let bookIsRead = document.createElement('p');
    bookIsRead.classList.add('book-is-read');
    bookIsRead.setAttribute('data-is-read', book.isRead);
    bookIsRead.textContent = 'Status: ';

    let bookStatus = document.createElement('span');
    bookStatus.classList.add('book-status');
    bookStatus.textContent = book.isRead;

    bookIsRead.appendChild(bookStatus);
    // let readStatus = book.isRead ? 'Read' : 'Not Read';

    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('book-el-buttons-container');
    let removeBook = document.createElement('button');
    removeBook.textContent = 'Remove';
    removeBook.classList.add('remove-book');
    // removeBook.addEventListener('click', removeBookFromLibrary);
    let changeReadStatus = document.createElement('button');
    changeReadStatus.textContent = 'Change Read Status';
    changeReadStatus.classList.add('change-read-status');
    buttonsContainer.appendChild(removeBook);
    buttonsContainer.appendChild(changeReadStatus);
    bookDiv.appendChild(bookName);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPages);
    bookDiv.appendChild(bookIsRead);
    bookDiv.appendChild(buttonsContainer);
    document.querySelector('#library-container-el').appendChild(bookDiv);
  });
}

function changeReadStatus() {
const libraryContainer = ui.libraryContainer
const bookDivs = libraryContainer.querySelectorAll('.card');
for (let i = 0; i < bookDivs.length; i++) {
  const bookCard = bookDivs[i];
  const changeStatusButton = bookCard.querySelector('.change-read-status')
  const bookStatus = bookCard.querySelector(".book-status")
  changeStatusButton.addEventListener('click', function () {
   if (bookStatus.textContent === 'Read') {
     bookStatus.textContent = 'Not Read'
     myLibrary[i].isRead = false
   } else {
     bookStatus.textContent = 'Read'
     myLibrary[i].isRead = true
   }
  })
}
}

function removeBookFromLibrary() {
  const libraryContainer = ui.libraryContainer
  const bookDivs = libraryContainer.querySelectorAll('.card');
  for (let i = 0; i < bookDivs.length; i++) {
    const bookCard = bookDivs[i];
    const removeButton = bookCard.querySelector('.remove-book')
    removeButton.addEventListener('click', function () {
      bookCard.remove()
    })
  }
}

// Event Listeners
  ui.addBookButton.addEventListener('click', () => {
    ui.addBookDialog.showModal();
  });

  ui.formCancelButton.addEventListener('click', () => {
    ui.dialog.close();
  });

  ui.formSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let bookName = document.querySelector('#book-name').value;
    let bookAuthor = document.querySelector('#book-author').value;
    let bookPages = document.querySelector('#book-pages').value;
    let bookIsRead = document.querySelector('#book-is-read').checked;
    let book = new Book(bookName, bookAuthor, bookPages, bookIsRead);

    addToLibrary(book);
    ui.addBookDialog.close();
    displayBooks(myLibrary);
  });

  ui.removeAllBooksButton.addEventListener('click', () => {
    removeAllBooks();
  });

  function main() {
    // Initial library display
    displayBooks(myLibrary);
    // unique book removal
    removeBookFromLibrary()
    // Change read status
    changeReadStatus()
}

main()
