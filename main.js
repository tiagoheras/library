const showBooksBtn = document.getElementById('show-books');
const showFormBtn = document.getElementById('show-form');
const closeForm = document.getElementById('close');
    
const form = document.querySelector('form');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

const createBookBtn = document.getElementById('create-book');

let myLibrary = [{ title: 'Harry Potter', author: 'J.K Rowlling', pages: 800, read: false }];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// Adds book to library array
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    return myLibrary.push(newBook);
}

function displayBooks() {
    showBooksBtn.innerText = 'Hide Books'
    const table = document.createElement('table');
    table.setAttribute('id', 'books-table');
    const tr = document.createElement('tr');
    const title = document.createElement('th');
    title.innerText = 'Title';
    const author = document.createElement('th');
    author.innerText = 'Author';
    const pages = document.createElement('th');
    pages.innerText = 'Pages';
    const read = document.createElement('th');
    read.innerText = 'Read'
    tr.appendChild(title)
    tr.appendChild(author)
    tr.appendChild(pages)
    tr.appendChild(read)

    table.appendChild(tr)
    document.body.appendChild(table);

    myLibrary.forEach(book => {
        const newTr = document.createElement('tr');
        const title = document.createElement('td');
        title.innerText = book.title;
        const author = document.createElement('td');
        author.innerText = book.author;
        const pages = document.createElement('td');
        pages.innerText = book.pages;
        const read = document.createElement('td');
        read.innerText = book.read;
        newTr.appendChild(title)
        newTr.appendChild(author)
        newTr.appendChild(pages)
        newTr.appendChild(read)
        table.appendChild(newTr)
    })
}

function hideBooks() {
    showBooksBtn.innerText = 'Show Books'
    const table = document.getElementById('books-table');
    document.body.removeChild(table);
}

showBooksBtn.addEventListener('click', (e) => {
    const btnText = e.target.innerText;
    if (btnText === 'Show Books') {
        displayBooks();
    } else {
        hideBooks();
    }
})

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
})

closeForm.addEventListener('click', (e) => {
    e.preventDefault();
form.style.display = 'none'
})
