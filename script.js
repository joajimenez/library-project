ui = {
  addBookButton: document.querySelector('.add-book-btn'),
  removeAllBooksButton: document.querySelector('.remove-all-btn'),
  addBookDialog: document.querySelector('#add-book-dialog'),
};

let myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Read'),

  new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, 'Read'),
  new Book('The NeverEnding Story', 'Michael Ende', 368, 'Read'),
];

function Book(name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks(arr) {
  arr.forEach((book) => {
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.classList.add('card');
    bookDiv.setAttribute('data-index', myLibrary.indexOf(book));
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

ui.addBookButton.addEventListener('click', () => {
  ui.addBookDialog.showModal();
});

// console.log(ui);
displayBooks(myLibrary);
