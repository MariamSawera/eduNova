window.onload = function () {

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", function () {
  const input = searchBar.value.toLowerCase();
  const books = document.querySelectorAll(".book-container .book-card");

  books.forEach(function (book) {
    const text = book.textContent.toLowerCase();

    if (text.includes(input)) {
      book.style.display = "";
    } else {
      book.style.display = "none";
    }
  });
});

}


function  updateClock () {
  const now = new Date ();
  const time = now.toLocaleTimeString();
  document.getElementById("clock").textContent = "Current Time:" + " " + time;
}
setInterval(updateClock, 1000);
updateClock();

// Get the form and discussion area elements
var form = document.getElementById("questionForm");
var discussionArea = document.getElementById("discussionArea");

// When the form is submitted (user asks a question)
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from refreshing

  // Get the name and question values from the input fields
  var nameInput = document.getElementById("userName");
  var questionInput = document.getElementById("userQuestion");

  var name = nameInput.value.trim();
  var question = questionInput.value.trim();

  // If no name is given, use "Anonymous"
  if (name === "") {
    name = "Anonymous";
  }

  // If the question is empty, stop here
  if (question === "") {
    return;
  }

  // Create a new div for the question
  var questionDiv = document.createElement("div");
  questionDiv.className = "question"; // for styling

  // Add the question HTML inside the div
  questionDiv.innerHTML =
    "<p><strong>" + name + "</strong> asked:</p>" +
    "<div class='text'>" + question + "</div>" +
    "<div class='reply-box'>" +
      "<form class='replyForm'>" +
        "<input type='text' placeholder='Your Name (optional)'>" +
        "<textarea rows='2' placeholder='Reply to this question...' required></textarea>" +
        "<button type='submit'>Reply</button>" +
      "</form>" +
      "<div class='replies'></div>" +
    "</div>";

  // Add the new question at the top of the discussion area
  discussionArea.prepend(questionDiv);

  // Clear the form inputs
  nameInput.value = "";
  questionInput.value = "";

  // Now handle replies for this specific question
  var replyForm = questionDiv.querySelector(".replyForm");
  var repliesContainer = questionDiv.querySelector(".replies");

  // When a reply is submitted
  replyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the name and reply text
    var replyNameInput = replyForm.querySelector("input");
    var replyTextInput = replyForm.querySelector("textarea");

    var replyName = replyNameInput.value.trim();
    var replyText = replyTextInput.value.trim();

    if (replyName === "") {
      replyName = "Anonymous";
    }

    if (replyText === "") {
      return;
    }

    // Create a new reply element
    var replyDiv = document.createElement("div");
    replyDiv.className = "reply";
    replyDiv.innerHTML =
      "<p><strong>" + replyName + "</strong> replied:</p>" +
      "<div class='text'>" + replyText + "</div>";

    // Add the reply below the question
    repliesContainer.appendChild(replyDiv);

    // Clear the reply form
    replyNameInput.value = "";
    replyTextInput.value = "";
  });
});
