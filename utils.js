import { ui } from './ui.js';

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
