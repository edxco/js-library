// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAkEY49W_RKvLI6rcO_r6SjnrJUvwduu2U",
  authDomain: "library-836fa.firebaseapp.com",
  databaseURL: "https://library-836fa-default-rtdb.firebaseio.com",
  projectId: "library-836fa",
  storageBucket: "library-836fa.appspot.com",
  messagingSenderId: "742428988728",
  appId: "1:742428988728:web:9081a66a88d2169030ddcd",
  measurementId: "G-7T30W83E97"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function Book(title, author, page, read) {
  this.title = title
  this.author = author
  this.page = page
  this.read = read
}

function error(error) {
  if (error) {
    alert('Houston! we have a problem!')
  } else {
    alert('Data saved successfully!')
  }
}

function displayBooksSaved() {
  firebase.database().ref('books').orderByChild('author').on('value', function (snapshot) {

    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();

      let key = childSnapshot.key
      let b_title = childSnapshot.val().title;
      let b_author = childSnapshot.val().author;
      let b_page = childSnapshot.val().page;
      let b_read = childSnapshot.val().read;

      const u = document.querySelector('#container-card');

      let ul = document.createElement('div');
      let a = document.createElement('div');
      let b = document.createElement('div');
      let c = document.createElement('div');
      let d = document.createElement('div');
      const li = document.createElement('div');

      a.innerHTML = `<strong class="fs-3 fw-light">${b_title}</strong>`;
      b.innerHTML = `<strong>Author:</strong> ${b_author}`;
      c.innerHTML = `<strong>Pages:</strong> ${b_page}`;

      let status = 'Already read'
      if (b_read) {
        status = 'Yet to read'
      }

      d.innerHTML = `${status}`;

      let button1 = document.createElement('button')
      button1.innerHTML = 'Erase'
      button1.setAttribute('id', 'erase');
      button1.classList.add('btn', 'btn-primary')

      let button2 = document.createElement('button')
      button2.innerHTML = `${status}`
      button2.setAttribute('id', 'change');
      button2.classList.add('btn', 'btn-primary')

      u.appendChild(ul)
      ul.classList.add('mx-auto', 'my-3');
      ul.appendChild(a).classList.add('card', 'text-dark', 'bg-light', 'p-3');
      ul.appendChild(b).classList.add("list-group-item");
      ul.appendChild(c).classList.add("list-group-item");
      ul.appendChild(d).classList.add("list-group-item");
      ul.appendChild(button1);
      button1.setAttribute('data-pos', key);
      ul.appendChild(button2);
      button2.setAttribute('data-pos', key);

      button2.addEventListener('click', (e) => {
        let route = e.target.getAttribute('data-pos');
        let db_firebase = firebase.database().ref('books/' + route);

        console.log(b_read)
        if (b_read) {
          db_firebase.update({
            'read': false
          })
        } else {
          db_firebase.update({
            'read': true
          })
        }
      })

      button1.addEventListener('click', (e) => {
        let route = e.target.getAttribute('data-pos');
        let db_firebase = firebase.database().ref('books/' + route);

        db_firebase.remove()

      })
    });
  });
}

function addBookToLibrary() {
  title = document.getElementById('title').value;
  author = document.getElementById('author').value;
  page = document.getElementById('page').value;
  read = document.getElementById('read').checked;

  let book = new Book(title, author, page, read)

  firebase.database().ref('books').push(book);
  //set(push(book), error(error)); 
}

let but_addBook = document.querySelector('#btn')
but_addBook.addEventListener('click', appear)

function appear() {
  document.getElementById('addBook').className = "d-block";
}

let submit = document.querySelector('.submit')
submit.addEventListener('click', addBookToLibrary)

let display = document.querySelector('#ex-table')

displayBooksSaved()