let myLibrary = [];

function Book(title, author, page, read) {
  this.title = title
  this.author = author
  this.page = page
  this.read = read
}

function addBookToLibrary() {
   title = document.getElementById('title').value;
   author = document.getElementById('author').value;
   page = document.getElementById('page').value;
   read = document.getElementById('read').checked;
   //let x = Book.new(title, author, page, read)
   myLibrary.push(new Book(title, author, page, read))
}

let but_addBook = document.querySelector('#btn')
but_addBook.addEventListener('click', appear)

function appear(){
    document.getElementById('addBook').className = "d-block";
}

let submit = document.querySelector('.submit')
submit.addEventListener('click', addBookToLibrary)
