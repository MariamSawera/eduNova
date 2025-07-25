// function updateName() {
//       const name = document.getElementById('nameInput').value;
//       const welcome = document.getElementById('welcome');
//       if(name.trim()) {
//         welcome.textContent = `Hello, ${name}! 👋`;
//       } else {
//         welcome.textContent = `Hello, Guest 👋`;
//       }
//     }

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", function () {
  const input = searchBar.value.toLowerCase();
  const books = document.querySelectorAll(".book-container .book-card");

  books.forEach(function (book) {
    const text = book.textContent.toLowerCase();
    console.log("Input typed:", input);

    if (text.includes(input)) {
      book.style.display = "";
    } else {
      book.style.display = "none";
    }
  });
});
