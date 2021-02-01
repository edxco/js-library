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

      const u = document.querySelector('#container-card');

      const ul = document.createElement('div');

      const a = document.createElement('div');
      a.innerHTML = `<span class="fs-3 fw-light">${dbTitle}</span>`;

      const b = document.createElement('div');
      b.classList.add('list-group-item');
      b.innerHTML = `<strong>Author:</strong> ${dbAuthor}`;

      const c = document.createElement('div');
      c.classList.add('list-group-item');
      c.innerHTML = `<strong>Pages:</strong> ${dbPage}`;

      const d = document.createElement('div');
      d.classList.add('list-group-item');
      let status = 'Already read';
      let statusButton = 'Mark as unread';
      if (!dbRead) {
        status = 'Yet to read';
        statusButton = 'Mark as read';
      }
      d.innerHTML = `${status}`;

      const button1 = document.createElement('button');
      button1.innerHTML = 'Delete';
      button1.classList.add('btn', 'btn-danger', 'mr-1', 'mt-2', 'mb-4');
      button1.setAttribute('data-pos', key);

      const button2 = document.createElement('button');
      button2.innerHTML = `${statusButton}`;
      button2.classList.add('btn', 'btn-info', 'mx-1', 'mt-2', 'mb-4');
      button2.setAttribute('data-pos', key);

      ul.classList.add('mx-auto', 'my-3');
      ul.appendChild(a).classList.add('card', 'text-dark', 'bg-light', 'p-3');
      ul.appendChild(b);
      ul.appendChild(c);
      ul.appendChild(d);
      ul.appendChild(button1);
      ul.appendChild(button2);

      button2.addEventListener('click', (e) => {
        const route = e.target.getAttribute('data-pos');
        const dbFirebase = firebase.database().ref(`books/${route}`);

        if (dbRead) {
          dbFirebase.update({
            read: false,
          });
        } else {
          dbFirebase.update({
            read: true,
          });
        }
        window.location.reload();
      });

      button1.addEventListener('click', (e) => {
        const route = e.target.getAttribute('data-pos');
        const dbFirebase = firebase.database().ref(`books/${route}`);

        dbFirebase.remove();
        window.location.reload();
      });

      u.appendChild(ul);
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
