const books = [];
const EVENT_BOOK = "render-book";
const SAVED_EVENT = "saved-bookshelf";
const STORAGE_KEY = "BOOKSHELF_APPS";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromLocalStorage();
  }
});

function addBook() {
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isCompleted = document.getElementById("inputBookIsComplete").checked;

  const generatedID = generatedId();
  const datas = BookShelf(generatedID, title, author, year, isCompleted);
  books.push(datas);
  document.dispatchEvent(new Event(EVENT_BOOK));
  saveData();
}

function generatedId() {
  return +new Date();
}

function BookShelf(id, title, author, year, isCompleted) {
  return { id, title, author, year: parseInt(year), isCompleted };
}

function addBookToCompleted(id) {
  const BookTarget = findBook(id);

  if (BookTarget == null) return;

  BookTarget.isCompleted = true;
  document.dispatchEvent(new Event(EVENT_BOOK));
  saveData();
}

function makeBookShelf(datas) {
  const Title = document.createElement("h2");
  Title.innerText = datas.title;
  const Author = document.createElement("p");
  Author.innerText = "Author : " + datas.author;
  const Year = document.createElement("p");
  Year.innerText = "Year : " + datas.year;
  const TextContent = document.createElement("div");
  TextContent.classList.add("inner");
  TextContent.append(Title, Author, Year);
  const container = document.createElement("div");
  container.classList.add("item");
  container.append(TextContent);
  container.setAttribute("id", `book-${datas.id}`);
  if (datas.isCompleted) {
    const undoBtn = document.createElement("button");
    undoBtn.classList.add("undo-button");
    undoBtn.addEventListener("click", function () {
      undoBookFromCompleted(datas.id);
    });
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("red");
    trashBtn.addEventListener("click", function () {
      removeBookFromFinished(datas.id);
      alert("Buku telah terhapus!:)");
    });
    container.append(undoBtn, trashBtn);
  } else {
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("green");
    checkBtn.addEventListener("click", function () {
      addBookToCompleted(datas.id);
    });
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("red");
    trashBtn.addEventListener("click", function () {
      removeBookFromFinished(datas.id);
      alert("Buku telah terhapus!:)");
    });
    container.append(checkBtn, trashBtn);
  }
}

function findBook(id) {
  for (const bookItem of books) {
    if (bookItem.id === id) {
      return bookItem;
    }
  }
  return null;
}

document.addEventListener(EVENT_BOOK, function () {
  const unFinishedBookList = document.getElementById("incompleteBookshelfList");
  unFinishedBookList.innerHTML = "";

  const finishedBookList = document.getElementById("completeBookshelfList");
  finishedBookList.innerHTML = "";

  for (const bookItem of books) {
    const bookEl = makeBookShelf(bookItem);
    if (!bookItem.isCompleted) {
      unFinishedBookList.append(bookEl);
    } else {
      finishedBookList.append(bookEl);
    }
  }
});

function removeBookFromFinished(id) {
  const BookTarget = findBook(id);

  if (BookTarget === -1) return;
  books.splice(BookTarget, 1);

  document.dispatchEvent(new Event(EVENT_BOOK));
  saveData();
}

function undoBookFromCompleted(id) {
  const BookTarget = findBook(id);
  if (BookTarget == null) return;

  BookTarget.isCompleted = false;

  document.dispatchEvent(new Event(EVENT_BOOK));
  saveData();
}

function findBookIndex(id) {
  for (const i in books) {
    if (books[i].id === id) {
      return i;
    }
  }

  return -1;
}

document.addEventListener(EVENT_BOOK, function () {
  console.log(books);
});

document
  .getElementById("searchSubmit")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const search = document
      .getElementById("searchBookTitle")
      .value.toLowerCase();

    const bookList = document.querySelectorAll(".inner h2:nth-child(1)");
    for (const book of bookList) {
      if (book.innerHTML.toLowerCase().includes(search)) {
        book.parentElement.style.display = "block";
      } else {
        book.parentElement.style.display = "none";
      }
    }
  });

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromLocalStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const bookShelf of data) {
      books.push(bookShelf);
    }
  }
  document.dispatchEvent(new Event(EVENT_BOOK));
}
