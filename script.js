document.addEventListener("DOMContentLoaded", function () {
  // const searchBar = document.getElementById("searchBar"); //searchbar on books page

  // if (searchBar) {
  //   searchBar.addEventListener("keyup", function () {
  //     const input = searchBar.value.toLowerCase();
  //     const books = document.querySelectorAll(".book-container .book-card");

  //     books.forEach(function (book) {
  //       const text = book.textContent.toLowerCase();

  //       if (text.includes(input)) {
  //         book.style.display = "";
  //       } else {
  //         book.style.display = "none";
  //       }
  //     });
  //   });
  // }

  function setupSearch(inputId, cardSelectors) {
    const searchBar = document.getElementById(inputId);

    if (!searchBar) return;

    searchBar.addEventListener("keyup", function () {
      const input = searchBar.value.toLowerCase();
      const cards = document.querySelectorAll(cardSelectors);

      cards.forEach(function (card) {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(input) ? "" : "none";
      });
    });
  }

  // Books Page
  setupSearch("searchBar", ".book-container .book-card");

  //  Instructors Page
  setupSearch("searchBar", ".instructor-container .instructor-card");

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
}
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

  const currentSemester = Math.floor(diffInMonths / 6) + 6;

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

//help page.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("questionForm");
  const nameInput = document.getElementById("userName");
  const questionInput = document.getElementById("userQuestion");
  const discussionArea = document.getElementById("discussionArea");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const question = questionInput.value.trim();

    if (!question) return;

    const post = document.createElement("div");
    post.classList.add("question-post");

    post.innerHTML = `
        <strong>${name || "Anonymous"} asked:</strong>
        <p>${question}</p>
        <button class="reply-btn">Reply</button>
        <div class="replies"></div>
      `;

    discussionArea.prepend(post);

    nameInput.value = "";
    questionInput.value = "";

    const replyBtn = post.querySelector(".reply-btn");
    const repliesContainer = post.querySelector(".replies");

    replyBtn.addEventListener("click", function () {
      if (post.querySelector(".reply-form")) return;

      const replyForm = document.createElement("form");
      replyForm.classList.add("reply-form");
      replyForm.innerHTML = `
          <input type="text" class="reply-name" placeholder="Your Name (optional)" />
          <textarea class="reply-text" rows="2" placeholder="Your reply..." required></textarea>
          <button type="submit">Post Reply</button>
        `;

      repliesContainer.before(replyForm);

      replyForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const replyName = replyForm.querySelector(".reply-name").value.trim();
        const replyText = replyForm.querySelector(".reply-text").value.trim();

        if (!replyText) return;

        const reply = document.createElement("div");
        reply.classList.add("reply");
        reply.innerHTML = `
            <strong>${replyName || "Anonymous"} replied:</strong>
            <p>${replyText}</p>
          `;

        repliesContainer.appendChild(reply);

        replyForm.remove();
      });
    });
  });
});

const text = "Thank you for contacting us!";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("thanks-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 70);
  }
}
typeWriter();
