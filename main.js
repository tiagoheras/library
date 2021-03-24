const table = document.querySelector('table');

const showBooksBtn = document.getElementById('show-books');
const showFormBtn = document.getElementById('show-form');
const closeForm = document.getElementById('close');

const form = document.querySelector('form');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

const createBookBtn = document.getElementById('create-book');

let myLibrary = [{ title: 'Harry Potter', author: 'J.K Rowlling', pages: 800, read: false }, { title: 'Harry Potter', author: 'J.K Rowlling', pages: 800, read: false }];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

let index = -1;

// Adds book to library array
function addBookToLibrary(title, author, pages, read) {
    index += 1;
    const newBook = new Book(title, author, pages, read);
    const newTr = document.createElement('tr');
    let readIconHTML;
    if (newBook.read === true) {
        readIconHTML = '<i id="toggle-read" class="fas fa-book"></i>'
    } else {
        readIconHTML = '<i id="toggle-read" class="fab fa-readme"></i>'
    }
    newTr.innerHTML = `<tr><td>${newBook.title}</td><td>${newBook.author}</td><td>${newBook.pages}</td><td>${newBook.read}</td><td>${readIconHTML}</td><td><i id="delete-book" class="fas fa-trash"></i></td></tr>`;
    newTr.setAttribute('data-index', `${index}`)
    table.appendChild(newTr);
    return myLibrary.push(newBook);
}

// const toggleButtons = document.querySelectorAll("i[id='toggle-read']");

function deleteBook(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    const book = document.querySelector(`tr[data-index="${bookIndex}"]`)
    table.removeChild(book);
}

function toggleRead(bookIndex) {
    const book = document.querySelector(`tr[data-index="${bookIndex}"]`);
    book.read = !book.read;
    book.children[3].textContent = book.read;
    // if (book.read === true) {
    //     book.children[4].innerHTML = '<i id="toggle-read" class="fas fa-book"></i>';
    // } else {
    //     book.children[4].innerHTML = '<i id="toggle-read" class="fab fa-readme"></i>';
    // }
    console.log(book.children[3].textContent);
}


showFormBtn.addEventListener('click', () => {
    form.style.display = 'flex';
})

createBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = titleInput.value,
        author = authorInput.value,
        pages = Number(pagesInput.value),
        read = Boolean(pagesInput.value);
    addBookToLibrary(title, author, pages, read);
    form.style.display = 'none';

    const deleteButtons = document.querySelectorAll('i[id="delete-book"]');

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', (e) => {
            const index = e.path[2].dataset.index;
            deleteBook(index);
        })
    })

    const toggleButtons = document.querySelectorAll('i[id="toggle-read"]');

    toggleButtons.forEach(toggleButton => {
        toggleButton.addEventListener('click', (e) => {
            const index = e.path[2].dataset.index;
            toggleRead(index);
        })
    })

})

closeForm.addEventListener('click', (e) => {
    e.preventDefault();
    form.style.display = 'none'
})


