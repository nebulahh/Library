const sideBtn = document.querySelector('#add-book-btn');
const formBtn = document.querySelector('#form-btn');
const container = document.querySelector('.book-container');

// will show form after button is clicked
sideBtn.addEventListener('click', bringOutForm);
formBtn.addEventListener('click', addBookToLibrary);

// add center class to show form on screen
function bringOutForm() {
  document.querySelector('.form').classList.add('center');
}

// Library
let myLibrary = [];

// book constructor
function Book(author, title, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.changeStatus = function () {
  if (this.readStatus === 'Not read') {
    this.readStatus = 'Read';
  } else {
    this.readStatus = 'Not read';
  }
};

// let book = new Book();

// store the form input into an object and store the object into an array
function addBookToLibrary(e) {
  // prevents the form from reloading the page
  e.preventDefault();

  let title = document.getElementById('author').value;
  let author = document.getElementById('title').value;
  let pages = document.getElementById('pages').value;
  let haveRead = document.getElementById('read').checked;
  console.log(haveRead);

  if (haveRead === true) {
    haveRead = 'Read';
  } else {
    haveRead = 'Not read';
  }

  myLibrary.push(new Book(title, author, pages, haveRead));

  // hides the form
  document.querySelector('.form').classList.remove('center');

  // this will clear the form after the form's button is presses
  document.querySelector('form').reset();

  container.textContent = '';

  // display array content on the screen
  displayLibrary();
}

function displayLibrary() {
  myLibrary.forEach((book, index) => {
    // create html element for the books
    let contain = document.createElement('div');
    let x = document.createElement('h4');
    let title = document.createElement('p');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let status = document.createElement('div');

    // fill the attributes and content of the element with the objects values
    x.textContent = 'X';
    title.textContent = 'Title: ' + book.title;
    author.textContent = 'Author: ' + book.author;
    pages.textContent = 'Pages: ' + book.pages;
    status.textContent = book.readStatus;

    // sets all the atrribute
    x.setAttribute('class', 'cancel');
    x.dataset.erase = 'book-' + index;
    contain.classList.add('book-content');
    contain.setAttribute('id', 'book-' + index);
    // console.log(contain);

    // append to DOM
    contain.append(x, title, author, pages, status);
    document.querySelector('.book-container').appendChild(contain);

    // change book status
    status.addEventListener('click', willChangeStatus);
    function willChangeStatus() {
      // after adding a book thru the constructor, i cud not change the status, so this checks if the book is an instance of the constructor
      if (book instanceof Book) {
        book.changeStatus();
      }
      // check if the default book have no or yes as status and change their status
      else if (myLibrary[index].readStatus === 'Not read') {
        myLibrary[index].readStatus = 'Read';
      } else {
        myLibrary[index].readStatus = 'Not read';
      }
      status.textContent = book.readStatus;
    }

    // Remove book from library
    x.addEventListener('click', () => {
      const erase = x.dataset.erase;
      const contain = document.getElementById(erase);
      console.log(erase);
      console.log(myLibrary);
      console.log(contain);
      console.log(contain.parentNode);
      contain.parentNode.removeChild(contain);
      console.log(index);

      myLibrary.splice(index - 1, 1);
    });
  });
}

// display library on page load
displayLibrary();
