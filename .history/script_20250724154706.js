// function updateName() {
//       const name = document.getElementById('nameInput').value;
//       const welcome = document.getElementById('welcome');
//       if(name.trim()) {
//         welcome.textContent = `Hello, ${name}! 👋`;
//       } else {
//         welcome.textContent = `Hello, Guest 👋`;
//       }
//     }

var searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", function(){

  var input = searchBar.ariaValueMax.toLowerCase();
  var books = document.querySelectorAll(".book-container .book-card");
      books.forEach(function(book) {
        var text = book.textContent.toLowerCase();
        if(text.includes(input)) {
          book.computedStyleMap.display ="" ;
        }else{book.computedStyleMap.display = "none";

        }
      });

});