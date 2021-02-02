// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* global firebase */

const firebaseConfig = {
  apiKey: 'AIzaSyAkEY49W_RKvLI6rcO_r6SjnrJUvwduu2U',
  authDomain: 'library-836fa.firebaseapp.com',
  databaseURL: 'https://library-836fa-default-rtdb.firebaseio.com',
  projectId: 'library-836fa',
  storageBucket: 'library-836fa.appspot.com',
  messagingSenderId: '742428988728',
  appId: '1:742428988728:web:9081a66a88d2169030ddcd',
  measurementId: 'G-7T30W83E97',
};
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
      const { key } = childSnapshot;
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

  const book = new Book(title, author, page, read);

  firebase.database().ref('books').push(book);
}

function appear() {
  document.getElementById('addBook').className = 'd-block';
}

const buttonAddBook = document.querySelector('#btn');
buttonAddBook.addEventListener('click', appear);

const submit = document.querySelector('.submit');
submit.addEventListener('click', addBookToLibrary);

displayBooksSaved();
