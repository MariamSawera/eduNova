document.addEventListener("DOMContentLoaded", function () {
  // ==============================
  // ANNOUNCEMENTS
  // ==============================
  const url =
    "https://opensheet.elk.sh/1TagnEqQ8JUZLzcBMFUgmLDw1XEQ5E1M8pZ_BKB2yiCo/Sheet1";

  const announcementDiv = document.getElementById("announcement");
  const announcementPopup = document.getElementById("announcementPopup");
  const modal = document.getElementById("announcementModal");

  if (announcementDiv || announcementPopup) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          // Sidebar list
          if (announcementDiv) {
            const ul1 = document.createElement("ul");
            


            data.forEach((item) => {
              const li = document.createElement("li");
              li.textContent = item.message || "(no message)";
              ul1.appendChild(li);
            });
            announcementDiv.innerHTML = "";
            announcementDiv.appendChild(ul1);
          }

          // Popup list
          if (announcementPopup) {
            const ul2 = document.createElement("ul");
            data.forEach((item) => {
              const li = document.createElement("li");
              li.textContent = item.message || "(no message)";
              ul2.appendChild(li);
            });
            announcementPopup.innerHTML = "";
            announcementPopup.appendChild(ul2);
          }

          // Show popup only once per session
          if (modal && !sessionStorage.getItem("announcementShown")) {
            modal.style.display = "flex";
            sessionStorage.setItem("announcementShown", "true");
          }
        } else {
          if (announcementDiv)
            announcementDiv.innerText = "No announcements right now.";
          if (announcementPopup)
            announcementPopup.innerText = "No announcements right now.";
        }
      });
  }

  // Close popup buttons
  const closeBtn = document.getElementById("closeAnnouncement");
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  const dontShowBtn = document.getElementById("dontShowToday");
  if (dontShowBtn && modal) {
    dontShowBtn.addEventListener("click", () => {
      sessionStorage.setItem("announcementShown", "true");
      modal.style.display = "none";
    });
  }

  const closeX = document.getElementById("closeAnnouncementX");
  if (closeX && modal) {
    closeX.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // ==============================
  // SEARCH BARS (books, instructors, gallery)
  // ==============================
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

  setupSearch("searchBar", ".book-container .book-card");
  setupSearch("searchBar", ".instructor-container .instructor-card");
  setupSearch("searchBar", ".project-container .project-card");

  // ==============================
  // CLOCK (exams page)
  // ==============================
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

  // ==============================
  // NAV MENU TOGGLE
  // ==============================
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });

    // close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  // ==============================
  // SEMESTER TRACKER
  // ==============================
  const card = document.getElementById("curr-semester");
  if (card) {
    const anchor = card.querySelector("a");
    const img = card.querySelector("img");
    const text = card.querySelector("p");
    const heading = card.querySelector("h2");

    const startDate = new Date("2025-08-01");
    const now = new Date();

    const diffInMonths =
      (now.getFullYear() - startDate.getFullYear()) * 12 +
      (now.getMonth() - startDate.getMonth());

    const currentSemester = Math.floor(diffInMonths / 6) + 6;

    if (currentSemester > 8) {
      if (anchor) anchor.style.display = "none";
      if (img) {
        img.src = "images/well-done.png";
        img.alt = "Well Done";
      }
      if (text) text.textContent = "🎉 Degree Completed";
      if (heading) heading.textContent = "Congratulations!";
    } else {
      if (anchor) anchor.href = `semester${currentSemester}.html`;
      if (img) {
        img.src = `images/blue-${currentSemester}.png`;
        img.alt = `Semester ${currentSemester}`;
      }
      if (text) text.textContent = `Semester ${currentSemester}`;
    }
  }

  // ==============================
  // HELP PAGE TYPEWRITER
  // ==============================
  const thanksText = document.getElementById("thanks-text");
  if (thanksText) {
    const text = "Thank you for contacting us!";
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        thanksText.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 70);
      }
    }
    typeWriter();
  }
});
