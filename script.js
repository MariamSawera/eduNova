document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("searchBar"); //searchbar on books page

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

  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
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

// tracking semester
document.addEventListener("DOMContentLoaded", function () {
  const card = document.getElementById("curr-semester");
  const anchor = card.querySelector("a");
  const img = card.querySelector("img");
  const text = card.querySelector("p");

  const startDate = new Date("2025-08-01");
  const now = new Date();

  const diffInMonths =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  let currentSemester = Math.floor(diffInMonths / 6) + 6;

  if (currentSemester > 8) {
    anchor.style.display = "none"; 
    img.src = "images/well-done.png"; 
    img.alt = "Well Done";
    text.textContent = "🎉 Degree Completed";
    heading.textContent = "Congratulations!";
    return;
  }

  anchor.href = `semester${currentSemester}.html`;
  img.src = `images/blue-${currentSemester}.png`;
  img.alt = `Semester ${currentSemester}`;
  text.textContent = `Semester ${currentSemester}`;
});

}
