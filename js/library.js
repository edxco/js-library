// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* global firebase */

import firebaseConfig from './firebase.js';
import elements from './domElement.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function Book(title, author, page, read) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}

function displayBooksSaved() {
  firebase.database().ref('books').orderByChild('title').on('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const {
        key,
      } = childSnapshot;
      const dbTitle = childSnapshot.val().title;
      const dbAuthor = childSnapshot.val().author;
      const dbPage = childSnapshot.val().page;
      const dbRead = childSnapshot.val().read;

      elements(key, dbTitle, dbAuthor, dbPage, dbRead);
    });
  });
}

function addBookToLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const page = document.getElementById('page').value;
  const read = document.getElementById('read').checked;

  if (title === '' || author === '' || page === '') {
    const warningField = document.getElementById('txtWarning');
    warningField.innerHTML = '<p class="fs-6">Some fields are empty</p>';
    warningField.appendChild(warningField);
  } else {
    const book = new Book(title, author, page, read);
    firebase.database().ref('books').push(book);
  }
}

function appear() {
  document.getElementById('addBook').className = 'd-block';
}

const buttonAddBook = document.querySelector('#btn');
buttonAddBook.addEventListener('click', appear);

const submit = document.querySelector('.submit');
submit.addEventListener('click', addBookToLibrary);

displayBooksSaved();