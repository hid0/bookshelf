const books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOKSHELF_APPS";

document.addEventListener("DOMContentLoaded", function () {
  const dataForm = document.getElementById("inputBook");
  dataForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addListBook();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  console.log(books);
  const uncompletedBookList = document.getElementById(
    "incompleteBookshelfList"
  );
  uncompletedBookList.innerHTML = "";

  const completedBookList = document.getElementById("completeBookshelfList");
  completedBookList.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) {
      uncompletedBookList.append(bookElement);
    } else {
      completedBookList.append(bookElement);
    }
  }
});

function generateId() {
  return +new Date();
}

function addListBook() {
  const titleBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const yearBook = document.getElementById("inputBookYear").value;
  const isCompleted = document.getElementById("inputBookIsComplete").checked;
  const generateID = generateId();
  const bookObject = generateBookObject(
    generateID,
    titleBook,
    authorBook,
    yearBook,
    isCompleted
  );
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}

function makeBook(bookObject) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = "Judul:" + bookObject.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = "Penulis: " + bookObject.author;

  const bookYear = document.createElement("p");
  bookYear.innerText = "Tahun: " + bookObject.year;

  const bookItem = document.createElement("article");
  const action = document.createElement("div");

  bookItem.classList.add("book_item");
  action.classList.add("action");

  bookItem.append(bookTitle, bookAuthor, bookYear, action);
  bookItem.setAttribute(
    "generateIDBook",
    "inputBook-$(bookObject.generatedIDBook"
  );

  if (bookObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.innerText = "Belum selesai dibaca";
    undoButton.classList.add("green");

    undoButton.addEventListener("click", function () {
      undoBookFromCompleted(bookObject.id);
    });

    const removeButton = document.createElement("button");
    removeButton.innerText = "Hapus buku";
    removeButton.classList.add("red");

    removeButton.addEventListener("click", function () {
      removeBook(bookObject.id);
    });

    action.append(undoButton, removeButton);
  } else {
    const finishButton = document.createElement("button");
    finishButton.innerText = "Selesai dibaca";
    finishButton.classList.add("green");

    finishButton.addEventListener("click", function () {
      addBookToCompleted(bookObject.id);
    });

    const removeButton = document.createElement("button");
    removeButton.innerText = "Hapus buku";
    removeButton.classList.add("red");

    removeButton.addEventListener("click", function () {
      removeBook(bookObject.id);
    });

    action.append(finishButton, removeButton);
  }
  return bookItem;
}

function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeBook(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  alert("buku berhasil dihapus");
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

document
  .getElementById("searchBook")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const searchBOOK = document
      .getElementById("searchBookTitle")
      .value.toLowerCase();
    const bookList = document.querySelectorAll(".book_item > h3");
    for (const book of bookList) {
      if (
        searchBOOK !== bookList[0].innerText.toLowerCase().includes(searchBOOK)
      ) {
        book.parentElement.style.display = "none";
      } else {
        book.parentElement.style.display = "block";
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
    alert("browser kao not support:)");
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}
