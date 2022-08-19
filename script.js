const books = [];
const RENDER_BOOK = "render-book";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("inputBook");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();
  });
  // if (loadData()) {
  //   loadDataFromLocal();
  // }
});

// function for addbook
function addBook() {
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;
  const id = +new Date();
  data = {
    id,
    title,
    author,
    year,
    isComplete,
  };

  books.push(data);
  document.dispatchEvent(new Event(RENDER_BOOK));
}

function readedBookshelf(BookInput) {
  // 🥱
}

function unreadBookshelf(BookInput) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = `Title : ${BookInput.title}`;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = `Author : ${BookInput.author}`;

  const bookYear = document.createElement("p");
  bookYear.innerText = `Tahun : ${BookInput.year}`;

  const Item = document.createElement("article");
  const actions = document.createElement("div");

  Item.classList.add("book_item");
  actions.classList.add("action");

  Item.append(bookTitle, bookAuthor, bookYear, actions);
  Item.setAttribute("generateBookID", `${BookInput.id}`);

  if (!BookInput.isComplete) {
    const uncompletedButton = document.createElement("button");
    uncompletedButton.classList.add("green");
    uncompletedButton.innerText = "Sudah selesai dibaca";

    uncompletedButton.addEventListener("click", function () {
      undoComplete(BookInput.id);
    });

    const delBtn = document.createElement("button");
    delBtn.classList.add("red");
    delBtn.innerText = "Hapus";

    delBtn.addEventListener("click", function () {
      deleteBook(BookInput.id);
    });

    actions.append(uncompletedButton, delBtn);
  } else {
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("green");

    checkBtn.addEventListener("click", function () {
      bookToComplete(BookInput.id);
    });

    Item.append(checkBtn);
  }
  return Item;
}

function bookToComplete(Id) {
  const book = findBook(Id);

  if (book == null) return;

  book.isComplete = true;
  document.dispatchEvent(new Event(RENDER_BOOK));
}

function findBook(Id) {
  for (const booksItem of books) {
    if (booksItem.id === Id) {
      return booksItem;
    }
  }
  return null;
}

document.addEventListener(RENDER_BOOK, function () {
  const incompletedBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  incompletedBookshelfList.innerHTML = "";

  const completedBookshelfList = document.getElementById(
    "completeBookshelfList"
  );
  completedBookshelfList.innerHTML = "";

  for (const bookItem of books) {
    const incompleteBookElement = unreadBookshelf(bookItem);
    const completeBookElement = readedBookshelf(bookItem);

    if (!bookItem.isComplete) {
      incompletedBookshelfList.append(incompleteBookElement);
    } else {
      completedBookshelfList.append(completeBookElement);
    }
  }
});
