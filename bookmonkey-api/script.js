// Bookmonkey

// Prevent reload of DOM due to "Submit"
document.body.addEventListener("submit", (event) => {
  event.preventDefault();
});

//API for Booklist
const booklistUrl = "http://localhost:4730/books/";

//Local Storage for books
const bookList = [];
let favoriteBooks = [];

//Load initial bookList
loadBookList();

//Load bookList from API
function loadBookList() {
  fetch(booklistUrl)
    .then((response) => {
      if (!response.ok) {
        alert(
          "There is a network error, can't load ToDo list. Do not forget to buy coffee."
        );
      }
      return response.json();
    })
    .then((booksFromApi) => {
      if (booksFromApi.length > 0) {
        bookList.push(...booksFromApi);

        renderBookList(bookList);
      } else {
        if (bookList.length === 0) {
          alert("Sorry mate, no books for you.");
        }
      }
    });
}

function renderBookList(randomList) {
  const list = document.querySelector("#books-list");
  list.innerHTML = "";
  randomList.forEach((book) => {
    const wrapperLi = document.createElement("li");

    const wrapHeader = document.createElement("header");

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = book.title;
    wrapHeader.appendChild(bookTitle);

    const author = document.createElement("p");
    author.innerText = book.author;
    wrapHeader.appendChild(author);

    wrapperLi.appendChild(wrapHeader);

    const isbn = document.createElement("p");
    isbn.innerText = book.isbn;
    wrapperLi.appendChild(isbn);

    const bookLink = document.createElement("a");
    bookLink.innerText = "Read more...";
    bookLink.href = "/book.html?isbn" + book.isbn;
    wrapperLi.appendChild(bookLink);

    const favoBtn = document.createElement("button");
    if (book.isFavorite === true) {
      favoBtn.innerText = "Remove from Favorites";
    } else {
      favoBtn.innerText = "Add to Favorites";
    }
    favoBtn.id = book.isbn;
    wrapperLi.appendChild(favoBtn);

    list.appendChild(wrapperLi);

    favoBtn.addEventListener("click", addToFavorites);
  });
}

function addToFavorites(event) {
  const addedBook = event.target.id;
  const bookIndex = bookList.findIndex((book) => book.isbn === addedBook);

  if (event.target.innerText === "Add to Favorites") {
    favoriteBooks.push(bookList[bookIndex]);
    event.target.innerText = "Remove from Favorites";
  } else if (event.target.innerText === "Remove from Favorites") {
    favoriteBooks = favoriteBooks.filter(
      (favorite) => favorite.isbn !== addedBook
    );
    event.target.innerText = "Add to Favorites";
  }

  updateBookList(bookIndex);
}

function updateBookList(bookIndex) {
  const updatedBook = bookList[bookIndex];
  const updateUrl = booklistUrl + updatedBook.isbn;
  updatedBook.isFavorite = !updatedBook.isFavorite;

  fetch(updateUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBook),
  })
    .then((response) => response.json())
    .then((updatedBookFromApi) => {
      bookList[bookIndex] = updatedBookFromApi;
    });
  loadBookList();
}

/*
function addToFavorites(event) {
  const addedBook = event.target.id;
  if (event.target.innerText === "Add to Favorites") {
    for (book of bookList) {
      if (book.isbn === addedBook) {
        favoriteBooks.push(book);
        event.target.innerText = "Remove from Favorites";
      }
    }
  } else if (event.target.innerText === "Remove from Favorites") {
    for (favorite of favoriteBooks) {
      if (favorite.isbn === addedBook) {
        favoriteBooks = favoriteBooks.filter(
          (favorite) => favorite.id !== addedBook
        );
        event.target.innerText = "Add to Favorites";
      }
    }
  }

  function updateBookList() {
    const updateUrl = booklistUrl + addedBook;
    const favoriteYes = true;
    fetch(updateUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book.favoriteYes),
    })
      .then((response) => response.json())
      .then((updatedBookFromApi) => {
        const bookIndex = bookList.findIndex(
          (book) => book.id === updatedBookFromApi.id
        );
        bookList[bookIndex] = updatedBookFromApi;
      });
  }
  console.log(addedBook);
  console.log(...favoriteBooks);
}*/

//Ignore everything beyond this point, it's just my notes for myself.

//Connect current todo to current <li> for use later in code
//todoLi.todoObj = todo;

//Capture the button clicks

//list.addEventListener("change", checkCheckbox);

//Add sticky todo if list is empty
/* function addStickyBook() {
  const stickyTodo = {
    description: "Sticky ToDo: Do NOT Forget to buy COFFEE!",
    done: false,
  };
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stickyTodo),
  })
    .then((response) => response.json())
    .then((stickyFromApi) => {
      todoList.push(stickyFromApi);
      renderTodoList(todoList);
    });
} */

//Create new todos in API
/* function addNewTodo() {
  //Retrieve trimmed input from text field
  const textInput = inputBox.value.trim();
  //if input === empty -> give out warning
  if (textInput === "") {
    alert("I would appreciate if you entered something.");
    return;
  }
  //Collect data for new Todo
  const newTask = {
    description: textInput,
    done: false,
  };
  //Check for duplicates
  let isDuplicate = false;
  todoList.forEach((todo) => {
    if (todo.description.toLowerCase() === textInput.toLowerCase()) {
      isDuplicate = true;
      return;
    }
  });
  if (isDuplicate) {
    alert("No duplicate Todo's please.");
    return;
  }
  //Post new todo to API
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  })
    .then((response) => response.json())
    .then((newTodoFromApi) => {
      todoList.push(newTodoFromApi);
      renderTodoList(todoList);
    });

  //Reset input text field
  inputBox.value = null;
  inputBox.focus();
} */

// Filter todos
//const filters = document.querySelector("#filters");
//filters.addEventListener("change", filterTodos);

/* function filterTodos(event) {
  // Capture value of radiobutton
  const filterValue = event.target.value;

  // Filter todoList based on radio button value
  let filteredList = [];
  if (filterValue === "open") {
    filteredList = todoList.filter(function (todo) {
      return todo.done === false;
    });
  } else if (filterValue === "done") {
    filteredList = todoList.filter(function (todo) {
      return todo.done === true;
    });
  } else {
    filteredList = todoList;
  }
  renderTodoList(filteredList);
} */

//Check the checkboxes if checked or unchecked. Check.
/* function checkCheckbox(event) {
  //Find out which checkbox is active
  const checkedBox = event.target;
  //Find out with <li> is involved
  const liElement = checkedBox.parentElement;
  //Connect checkbox event with todoobject in array
  const todo = liElement.todoObj;
  //Update the object when the box is checked
  todo.done = checkedBox.checked;
  updateTodoList(todo.id, todo);
} */

//remove done todos in API
//const removes = document.querySelector("#removeTodos");
//removes.addEventListener("click", removeTodos);

/* function removeTodos() {
  // Filter out the todos that are done
  const doneTodos = todoList.filter((todo) => {
    return todo.done;
  });
  // Package and delete todos from API
  Promise.all(
    doneTodos.map((todo) => {
      fetch(apiUrl + todo.id, {
        method: "DELETE",
      }).then((response) => {
        if (!response.ok) {
          alert("Problem okay? Yay okay?!");
        }
      });
    })
  )
    // Update working todoList to remove to not re-render deleted todos
    .then(() => {
      todoList = todoList.filter((todo) => !todo.done);
      if (todoList.length === 0) {
        loadTodoList();
      } else {
        renderTodoList(todoList);
      }
    });
} */

//Update checked status of todos in API
/* function updateTodoList(todoId, updatedCheckbox) {
  const updateUrl = apiUrl + todoId;
  fetch(updateUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCheckbox),
  })
    .then((response) => response.json())
    .then((updatedTodoFromApi) => {
      const todoIndex = todoList.findIndex(
        (todo) => todo.id === updatedTodoFromApi.id
      );
      todoList[todoIndex] = updatedTodoFromApi;
      loadTodoList();
    });
} */

//Variables for accessing inputs from DOM

/* const btnAddTodo = document.querySelector("#btn-add-todo");
const inputBox = document.querySelector("#input-box"); */
