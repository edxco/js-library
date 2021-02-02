/* global firebase */

function delBook(e) {
  const route = e.target.getAttribute('data-pos');
  const dbFirebase = firebase.database().ref(`books/${route}`);

  dbFirebase.remove();
  window.location.reload();
}

function elements(key, dbTitle, dbAuthor, dbPage, dbRead) {
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

  button1.addEventListener('click', delBook);

  u.appendChild(ul);
}

export default elements;