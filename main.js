// (() => {
//   let e = [];
//   function t(t) {
//     t.preventDefault();
//     const n = document.querySelector("#inputBookTitle"),
//       o = document.querySelector("#inputBookAuthor"),
//       d = document.querySelector("#inputBookYear"),
//       i = document.querySelector("#inputBookIsComplete"),
//       c = {
//         id: +new Date(),
//         title: n.value,
//         author: o.value,
//         year: d.value,
//         isComplete: i.checked,
//       };
//     console.log(c), e.push(c), document.dispatchEvent(new Event("bookChanged"));
//   }
//   function n(t) {
//     t.preventDefault();
//     const n = document.querySelector("#searchBookTitle");
//     (query = n.value),
//       query
//         ? c(
//             e.filter(function (e) {
//               return e.title.toLowerCase().includes(query.toLowerCase());
//             })
//           )
//         : c(e);
//   }
//   function o(t) {
//     const n = Number(t.target.id),
//       o = e.findIndex(function (e) {
//         return e.id === n;
//       });
//     -1 !== o &&
//       ((e[o] = { ...e[o], isComplete: !0 }),
//       document.dispatchEvent(new Event("bookChanged")));
//   }
//   function d(t) {
//     const n = Number(t.target.id),
//       o = e.findIndex(function (e) {
//         return e.id === n;
//       });
//     -1 !== o &&
//       ((e[o] = { ...e[o], isComplete: !1 }),
//       document.dispatchEvent(new Event("bookChanged")));
//   }
//   function i(t) {
//     const n = Number(t.target.id),
//       o = e.findIndex(function (e) {
//         return e.id === n;
//       });
//     -1 !== o &&
//       (e.splice(o, 1), document.dispatchEvent(new Event("bookChanged")));
//   }
//   function c(e) {
//     const t = document.querySelector("#incompleteBookshelfList"),
//       n = document.querySelector("#completeBookshelfList");
//     (t.innerHTML = ""), (n.innerHTML = "");
//     for (const c of e) {
//       const e = document.createElement("article");
//       e.classList.add("book_item");
//       const a = document.createElement("h2");
//       a.innerText = c.title;
//       const u = document.createElement("p");
//       u.innerText = "Penulis: " + c.author;
//       const r = document.createElement("p");
//       if (
//         ((r.innerText = "Tahun: " + c.year),
//         e.appendChild(a),
//         e.appendChild(u),
//         e.appendChild(r),
//         c.isComplete)
//       ) {
//         const t = document.createElement("div");
//         t.classList.add("action");
//         const o = document.createElement("button");
//         (o.id = c.id),
//           (o.innerText = "Belum Selesai dibaca"),
//           o.classList.add("green"),
//           o.addEventListener("click", d);
//         const a = document.createElement("button");
//         (a.id = c.id),
//           (a.innerText = "Hapus buku"),
//           a.classList.add("red"),
//           a.addEventListener("click", i),
//           t.appendChild(o),
//           t.appendChild(a),
//           e.appendChild(t),
//           n.appendChild(e);
//       } else {
//         const n = document.createElement("div");
//         n.classList.add("action");
//         const d = document.createElement("button");
//         (d.id = c.id),
//           (d.innerText = "Selesai dibaca"),
//           d.classList.add("green"),
//           d.addEventListener("click", o);
//         const a = document.createElement("button");
//         (a.id = c.id),
//           (a.innerText = "Hapus buku"),
//           a.classList.add("red"),
//           a.addEventListener("click", i),
//           n.appendChild(d),
//           n.appendChild(a),
//           e.appendChild(n),
//           t.appendChild(e);
//       }
//     }
//   }
//   function a() {
//     !(function (e) {
//       localStorage.setItem("books", JSON.stringify(e));
//     })(e),
//       c(e);
//   }
//   window.addEventListener("load", function () {
//     (e = JSON.parse(localStorage.getItem("books")) || []), c(e);
//     const o = document.querySelector("#inputBook"),
//       d = document.querySelector("#searchBook");
//     o.addEventListener("submit", t),
//       d.addEventListener("submit", n),
//       document.addEventListener("bookChanged", a);
//   });
// })();

// // =======================================================

// //1. Menambahkan Data Buku

// const inputBooks = [];
// const RENDER_BOOK_SUBMIT_EVENT = "render-book-submit-event";

// // Submit Input Form
// document.addEventListener("DOMContentLoaded", function () {
//   const submitInputBook = document.getElementById("inputBook");
//   submitInputBook.addEventListener("submit", function (event) {
//     event.preventDefault();
//     inputBook();
//   });
// });

// //function inputBook

// function inputBook() {
//   const inputBookTitle = document.getElementById("inputBookTitle").value;
//   const inputBookAuthor = document.getElementById("inputBookAuthor").value;
//   const inputBookYear = document.getElementById("inputBookYear").value;
//   const inputBookIsComplete = document.getElementById(
//     "inputBookIsComplete"
//   ).checked;

//   const generatedIDBook = generateIDBook();
//   const inputBookObject = generateinputBookObject(
//     generatedIDBook,
//     inputBookTitle,
//     inputBookAuthor,
//     inputBookYear,
//     inputBookIsComplete
//   );
//   inputBooks.push(inputBookObject);

//   document.dispatchEvent(new Event(RENDER_BOOK_SUBMIT_EVENT));
// }

// function generateIDBook() {
//   return +new Date();
// }

// function generateinputBookObject(
//   generatedIDBook,
//   inputBookTitle,
//   inputBookAuthor,
//   inputBookYear,
//   inputBookIsComplete
// ) {
//   return {
//     generatedIDBook,
//     inputBookTitle,
//     inputBookAuthor,
//     inputBookYear,
//     inputBookIsComplete,
//   };
// }

// //2. Memiliki dua Rak Buku

// function rakBelumSelesaiDibaca(inputBookObject) {
//   const bookTitle = document.createElement("h3");
//   bookTitle.innerText = "Judul:" + inputBookObject.inputBookTitle;

//   const bookAuthor = document.createElement("p");
//   bookAuthor.innerText = "Penulis: " + inputBookObject.inputBookAuthor;

//   const bookYear = document.createElement("p");
//   bookYear.innerText = "Tahun: " + inputBookObject.inputBookYear;

//   const bookItem = document.createElement("article");
//   const action = document.createElement("div");

//   bookItem.classList.add("book_item");
//   action.classList.add("action");

//   bookItem.append(bookTitle, bookAuthor, bookYear, action);
//   bookItem.setAttribute(
//     "generateIDBook",
//     "inputBook-$(inputBookObject.generatedIDBook"
//   );

//   if (!inputBookObject.inputBookIsComplete) {
//     const uncompletedButton = document.createElement("button");
//     uncompletedButton.classList.add("green");
//     uncompletedButton.innerText = "Sudah Selesai Dibaca?";

//     uncompletedButton.addEventListener("click", function () {
//       undoBookFromCompleted(inputBookObject.generateIDBook);
//     });

//     const eraseButton = document.createElement("button");
//     eraseButton.classList.add("red");
//     eraseButton.innerText = "Hapus";

//     eraseButton.addEventListener("click", function () {
//       eraseBookFromCompleted(inputBookObject.generateIDBook);
//     });

//     action.append(uncompletedButton, eraseButton);
//   } else {
//     const checkBookButton = document.createElement("button");
//     checkBookButton.classList.add("green");

//     checkBookButton.addEventListener("click", function () {
//       addBookToCompleted(inputBookObject.generateIDBook);
//     });

//     bookItem.append(checkBookButton);
//   }

//   return bookItem;
// }

// function rakSudahSelesaiDibaca(inputBookObject) {
//   const bookTitle = document.createElement("h3");
//   bookTitle.innerText = "Judul:" + inputBookObject.inputBookTitle;

//   const bookAuthor = document.createElement("p");
//   bookAuthor.innerText = "Penulis: " + inputBookObject.inputBookAuthor;

//   const bookYear = document.createElement("p");
//   bookYear.innerText = "Tahun: " + inputBookObject.inputBookYear;

//   const bookItem = document.createElement("article");
//   const action = document.createElement("div");

//   bookItem.classList.add("book_item");
//   action.classList.add("action");

//   bookItem.append(bookTitle, bookAuthor, bookYear, action);
//   bookItem.setAttribute(
//     "generateIDBook",
//     "inputBook-$(inputBookObject.generatedIDBook"
//   );

//   if (inputBookObject.inputBookIsComplete) {
//     const uncompletedButton = document.createElement("button");
//     uncompletedButton.classList.add("green");
//     uncompletedButton.innerText = "Belum Selesai Dibaca?";

//     uncompletedButton.addEventListener("click", function () {
//       undoBookFromCompleted(inputBookObject.generateIDBook);
//     });

//     const eraseButton = document.createElement("button");
//     eraseButton.classList.add("red");
//     eraseButton.innerText = "Hapus Buku";

//     eraseButton.addEventListener("click", function () {
//       eraseBookFromCompleted(inputBookObject.generateIDBook);
//     });

//     action.append(uncompletedButton, eraseButton);
//   } else {
//     const checkBookButton = document.createElement("button");
//     checkBookButton.classList.add("check-button", "action", "green");

//     checkBookButton.addEventListener("click", function () {
//       addBookToCompleted(inputBookObject.generateIDBook);
//     });

//     bookItem.append(checkBookButton);
//   }

//   return bookItem;
// }

// function addBookToCompleted(bookId) {
//   const bookTarget = findBooks(bookId);

//   if (bookTarget == null) return;

//   bookTarget.inputBookIsComplete = true;
//   document.dispatchEvent(new Event(RENDER_BOOK_SUBMIT_EVENT));
// }

// function findBooks(bookId) {
//   for (const booksItem of inputBooks) {
//     if (booksItem.generateIDBook === bookId) {
//       return booksItem;
//     }
//   }
//   return null;
// }

// document.addEventListener(RENDER_BOOK_SUBMIT_EVENT, function () {
//   const incompletedBookshelfList = document.getElementById(
//     "incompleteBookshelfList"
//   );
//   incompleteBookshelfList.innerHTML = "";

//   const completedBookshelfList = document.getElementById(
//     "completeBookshelfList"
//   );
//   completeBookshelfList.innerHTML = "";

//   for (const bookItem of inputBooks) {
//     const incompleteBookElement = rakBelumSelesaiDibaca(bookItem);
//     const completeBookElement = rakSudahSelesaiDibaca(bookItem);

//     if (!bookItem.inputBookIsComplete) {
//       incompletedBookshelfList.append(incompleteBookElement);
//     } else {
//       completedBookshelfList.append(completeBookElement);
//     }
//   }
// });

const bookShelfApps = [];
const RENDER_EVENT = "render-bookshelf";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBookShelf();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function addBookShelf() {
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const checkBox = document.getElementById("inputBookIsComplete").checked;

  const generatedID = generateId();
  const bookShelfObject = generateBookShelfObject(
    generatedID,
    title,
    author,
    year,
    checkBox,
    false
  );
  bookShelfApps.push(bookShelfObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function generateId() {
  return +new Date();
}

function generateBookShelfObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year: parseInt(year),
    isCompleted,
  };
}

function addTaskToCompleted(bookShelfId) {
  const bookShelfTarget = findBookShelf(bookShelfId);

  if (bookShelfTarget == null) return;

  bookShelfTarget.isCompleted = true;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function makeBookShelf(bookShelfObject) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = bookShelfObject.title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = "Penulis : " + bookShelfObject.author;

  const textYear = document.createElement("p");
  textYear.innerText = "Tahun : " + bookShelfObject.year;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `bookShelf-${bookShelfObject.id}`);

  if (bookShelfObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(bookShelfObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      removeTaskFromCompleted(bookShelfObject.id);
      alert("Anda telah menghapus buku!");
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      addTaskToCompleted(bookShelfObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      removeTaskFromCompleted(bookShelfObject.id);
      alert("Anda telah menghapus buku!");
    });

    container.append(checkButton, trashButton);
  }

  return container;
}

function findBookShelf(bookShelfId) {
  for (const bookShelfItem of bookShelfApps) {
    if (bookShelfItem.id === bookShelfId) {
      return bookShelfItem;
    }
  }
  return null;
}

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById(
    "incompleteBookshelfList"
  );
  uncompletedTODOList.innerHTML = "";

  const completedTODOList = document.getElementById("completeBookshelfList");
  completedTODOList.innerHTML = "";

  for (const bookShelfItem of bookShelfApps) {
    const bookShelfElement = makeBookShelf(bookShelfItem);
    if (!bookShelfItem.isCompleted)
      uncompletedTODOList.append(bookShelfElement);
    else completedTODOList.append(bookShelfElement);
  }
});

function removeTaskFromCompleted(bookShelfId) {
  const bookShelfTarget = findBookShelfIndex(bookShelfId);

  if (bookShelfTarget === -1) return;
  bookShelfApps.splice(bookShelfTarget, 1);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoTaskFromCompleted(bookShelfId) {
  const bookShelfTarget = findBookShelf(bookShelfId);

  if (bookShelfTarget == null) return;

  bookShelfTarget.isCompleted = false;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBookShelfIndex(bookShelfId) {
  for (const index in bookShelfApps) {
    if (bookShelfApps[index].id === bookShelfId) {
      return index;
    }
  }

  return -1;
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(bookShelfApps);
});

// -- Searching feature
document
  .getElementById("searchSubmit")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const searchBook = document
      .getElementById("searchBookTitle")
      .value.toLowerCase();
    const bookList = document.querySelectorAll(".inner h2:nth-child(1)");
    for (const book of bookList) {
      if (book.innerText.toLowerCase().includes(searchBook)) {
        book.parentElement.style.display = "block";
      } else {
        book.parentElement.style.display = "none";
      }
    }
  });

// -- PENYIMPANAN DATA MENGGUNAKAN LOCAL STORAGE
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(bookShelfApps);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

const SAVED_EVENT = "saved-bookshelf";
const STORAGE_KEY = "BOOKSHELF_APPS";

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

// -- PENGAMBILAN DATA DARI LOCAL STORAGE
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const bookShelf of data) {
      bookShelfApps.push(bookShelf);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}
