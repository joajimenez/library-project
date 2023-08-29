import { ui } from './ui.js';

export function displayBooks(arr) {
  ui.libraryContainer.innerHTML = '';
  arr.forEach((book) => {
    const bookDiv = createBookElement(book);
    ui.libraryContainer.appendChild(bookDiv);
  });
}

export function handleRemoveBook(button) {
  const bookDiv = button.closest('.card');
  const bookIndex = parseInt(bookDiv.getAttribute('data-index'));

  // Remove the book card from the DOM
  bookDiv.remove();

  // Remove the book object from the "libreria" array
  libreria.removeBook(bookIndex);
  console.log(libreria.bookshelf);

  console.log(`Book ${bookIndex} removed`);
}

export function handleReadStatus(button) {
  const bookDiv = button.closest('.card');
  const bookIndex = parseInt(bookDiv.getAttribute('data-index'));
  const bookStatus = bookDiv.querySelector('.book-status');

  libreria.bookshelf[bookIndex].isRead =
    libreria.bookshelf[bookIndex].isRead === 'Read' ? 'Not Read' : 'Read';
  bookStatus.textContent = libreria.bookshelf[bookIndex].isRead;
}

export function createBookElement(book, bookShelf) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book', 'card');

  const bookIndex = bookshelf.indexOf(book);
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
