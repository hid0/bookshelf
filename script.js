(() => {
  const books = [];
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inputBook");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      addBook();
    });
    if (loadData()) {
      loadDataFromLocal();
    }
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
    console.log(data);
    books.push(data);
    document.dispatchEvent(new Event("Booksssssss"));
  }
})();
