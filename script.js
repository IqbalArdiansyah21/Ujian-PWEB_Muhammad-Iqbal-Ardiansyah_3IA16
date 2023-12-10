document.addEventListener('DOMContentLoaded', function () {
    displayBooks();
});

function addOrUpdateBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let bookIndex = document.getElementById('bookIndex').value;

    if (title && author) {
        let book = {
            title: title,
            author: author
        };

        let books = getBooks();

        if (bookIndex === '') {
            books.push(book);
        } else {
            books[bookIndex] = book;
        }

        localStorage.setItem('books', JSON.stringify(books));

        displayBooks();
        clearForm();
    } else {
        alert('All fields must be filled!');
    }
}

function updateBook(index) {
    let books = getBooks();
    let selectedBook = books[index];

    document.getElementById('title').value = selectedBook.title;
    document.getElementById('author').value = selectedBook.author;
    document.getElementById('bookIndex').value = index;
}

function deleteBook(index) {
    let books = getBooks();
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
    clearForm();
}

function displayBooks() {
    let books = getBooks();
    let bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = '';

    for (let i = 0; i < books.length; i++) {
        let card = document.createElement('div');
        card.className = 'card';

        let titleElement = document.createElement('h3');
        titleElement.textContent = books[i].title;

        let authorElement = document.createElement('p');
        authorElement.textContent = 'Author: ' + books[i].author;

        let updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = function (idx) {
            return function () {
                updateBook(idx);
            };
        }(i);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function (idx) {
            return function () {
                deleteBook(idx);
            };
        }(i);

        card.appendChild(titleElement);
        card.appendChild(authorElement);
        card.appendChild(updateButton);
        card.appendChild(deleteButton);

        bookContainer.appendChild(card);
    }
}

function getBooks() {
    let books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('bookIndex').value = '';
}
