document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("searchBar");    //searchbar on books page

  if (searchBar) {
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

  assignmentSort();


  //exams page clock
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const clock = document.getElementById("clock");
    if (clock) {
      clock.textContent = "Current Time: " + time;
    }
  }

  setInterval(updateClock, 1000);
  updateClock();
});

//assignment page (assignment mark complete and sort function)
function assignmentSort() {
  const today = new Date();
  const assignments = document.querySelectorAll(".assignment");

  assignments.forEach((item) => {
    const deadlineStr = item.getAttribute("deadline-date");
    const deadline = new Date(deadlineStr);

    if (today > deadline) {
      item.classList.add("completed");

      const status = item.querySelector(".status");
      if (status) {
        status.textContent = "completed";
      }
    }
  });

  //sorting
  const assignmentList = document.querySelector(".assignment-list");
  if (!assignmentList) return;

  const assignmentItems = Array.from(assignmentList.children);

  assignmentItems.sort((firstItem, secondItem) => {
    const firstIsCompleted = firstItem.classList.contains("completed");
    const secondIsCompleted = secondItem.classList.contains("completed");

    return firstIsCompleted - secondIsCompleted;
  });

  assignmentItems.forEach((item) => assignmentList.appendChild(item));
}
