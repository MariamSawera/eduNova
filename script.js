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

//exam
function  updateClock () {
  const now = new Date ();
  const time = now.toLocaleTimeString();
  document.getElementById("clock").textContent = "Current Time:" + " " + time;
}
setInterval(updateClock, 1000);
updateClock();


//help

var form = document.getElementById("questionForm");
var discussionArea = document.getElementById("discussionArea");

form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  var nameInput = document.getElementById("userName");
  var questionInput = document.getElementById("userQuestion");

  var name = nameInput.value.trim();
  var question = questionInput.value.trim();

  if (name === "") {
    name = "Anonymous";
  }

  if (question === "") {
    return;
  }

  var questionDiv = document.createElement("div");
  questionDiv.className = "question"; 

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

  discussionArea.prepend(questionDiv);

  nameInput.value = "";
  questionInput.value = "";

  var replyForm = questionDiv.querySelector(".replyForm");
  var repliesContainer = questionDiv.querySelector(".replies");

  replyForm.addEventListener("submit", function (event) {
    event.preventDefault();

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

    var replyDiv = document.createElement("div");
    replyDiv.className = "reply";
    replyDiv.innerHTML =
      "<p><strong>" + replyName + "</strong> replied:</p>" +
      "<div class='text'>" + replyText + "</div>";

    repliesContainer.appendChild(replyDiv);

    replyNameInput.value = "";
    replyTextInput.value = "";
  });
});


//announcement
window.onload = function () {

  const announcements = [
    "Assignment Web development due 31 July",
    "Classes starting from 15 Aug",
    "Movie Day at University Oct 15"
  ];

  const listContainer = document.getElementById("announcements-list");

  announcements.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    listContainer.appendChild(li);
  });

  function addAnnouncement() {
  const input = document.getElementById("new-announcement");
  const text = input.value.trim();
  if (text) {
    const li = document.createElement("li");
    li.textContent = text;
    document.getElementById("announcements-list").appendChild(li);
    input.value = "";
  }
}
}