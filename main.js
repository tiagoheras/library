const grid = document.getElementById('grid');

const showBooksBtn = document.getElementById('show-books');
const showFormBtn = document.getElementById('show-form');
const closeForm = document.getElementById('close');

const formBackground = document.getElementById('form-background');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

const createBookBtn = document.getElementById('create-book');

let myLibrary = JSON.parse(localStorage.getItem('books') || "[]");

// Book constructor
function Book(title, author, pages, read, color) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.color = color
}

function generateLightColorHex() {
    let color = "#";
    for (let i = 0; i < 3; i++)
        color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
    return color;
}

function getBooks() {
    grid.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const newDiv = document.createElement('div');
        newDiv.setAttribute('data-index', index);
        const title = document.createElement('h1');
        title.textContent = book.title;
        const author = document.createElement('h2')
        author.textContent = `by ${book.author}`;
        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash fa-lg"></i>'; 
        deleteBtn.addEventListener('click', () => deleteBook(index));
        const toggleBtn = document.createElement('button');
        toggleBtn.addEventListener('click', () => toggleRead(index));
        if (book.read === true) {
            toggleBtn.textContent = 'Unread';
        } else {
            toggleBtn.textContent = 'Read';
        }

        newDiv.appendChild(title)
        newDiv.appendChild(author)
        newDiv.appendChild(pages)
        newDiv.appendChild(deleteBtn);
        newDiv.appendChild(toggleBtn);

        newDiv.style.backgroundColor = book.color;

        grid.appendChild(newDiv)
    })
}



// Adds book to library array
function addBookToLibrary(title, author, pages, read) {
    const color = generateLightColorHex();
    const newBook = new Book(title, author, pages, read, color);
    myLibrary.push(newBook);
    localStorage.setItem('books', JSON.stringify(myLibrary));
    document.querySelector('form').reset();
    getBooks();
}

// const toggleButtons = document.querySelectorAll("i[id='toggle-read']");

function deleteBook(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    localStorage.setItem('books', JSON.stringify(myLibrary));
    getBooks();
}

function toggleRead(bookIndex) {
    const book = myLibrary[bookIndex];
    book.read = !book.read;
    localStorage.setItem('books', JSON.stringify(myLibrary));
    getBooks();
}

getBooks()

showFormBtn.addEventListener('click', () => {
    formBackground.style.display = 'flex';
})

createBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = titleInput.value,
        author = authorInput.value,
        pages = Number(pagesInput.value),
        read = Boolean(pagesInput.value);
    addBookToLibrary(title, author, pages, read);
    formBackground.style.display = 'none';

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
    formBackground.style.display = 'none'
})


