document.addEventListener("DOMContentLoaded", () => {
  // --- Intro screen logic (if you still have intro) ---
  const enterBtn = document.getElementById("enter-btn");
  const mainContent = document.getElementById("main-content");
  const sky = document.querySelector(".sky");

  if (enterBtn && mainContent && sky) {
    enterBtn.addEventListener("click", () => {
      sky.style.display = "none";
      mainContent.classList.remove("hidden");
    });
  }

  // --- 21 reasons logic ---
  const heartsGrid = document.getElementById("hearts-grid");
  const modal = document.getElementById("reason-modal");
  const modalImg = document.getElementById("modal-image");
  const modalCaption = document.getElementById("modal-caption");
  const modalClose = document.getElementById("modal-close");

  // If for some reason hearts-grid isn't found, just stop (prevents errors)
  if (!heartsGrid) {
    console.warn("hearts-grid element not found");
    return;
  }

  const reasons = [
    {
      id: 1,
      img: "images/1.png",
      caption: "Reason #1 – You somehow make every place feel like home."
    },
    {
      id: 2,
      img: "images/2.png",
      caption: "Reason #2 – Your laugh is literally my favourite sound."
    },
    {
      id: 3,
      img: "images/3.png",
      caption: "Reason #3 – You hype me up even when I’m being a clown."
    },
    {
      id: 21,
      img: "images/4.jpg",
      caption: "Reason #21 – Because life is simply better with you in it."
    }
  ];

  // Create 21 heart buttons
  for (let i = 1; i <= 21; i++) {
    const btn = document.createElement("button");
    btn.className = "heart-btn";
    btn.dataset.id = i.toString();
    btn.innerHTML = `
      <span class="heart-icon">❤️</span>
      <span class="heart-number">#${i}</span>
    `;
    heartsGrid.appendChild(btn);
  }

  // When a heart is clicked, show popup
  heartsGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".heart-btn");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const reason = reasons.find((r) => r.id === id);
    if (!reason) return; // no data yet for this heart

    modalImg.src = reason.img;
    modalCaption.textContent = reason.caption;
    modal.classList.remove("hidden");
  });

  // Close modal on X click
  if (modalClose && modal) {
    modalClose.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // Close modal when clicking backdrop
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        modal.classList.add("hidden");
      }
    });
  }
});

  // --- Avatar slider logic ---
  const avatarImg   = document.getElementById("avatar-img");
  const avatarPrev  = document.getElementById("avatar-prev");
  const avatarNext  = document.getElementById("avatar-next");
  const avatarDots  = document.getElementById("avatar-dots");

  // Guard: if any piece missing, skip slider
  if (avatarImg && avatarPrev && avatarNext && avatarDots) {
    const avatarImages = [
      "images/avatars/1.png",
      "images/avatars/2.png",
      "images/avatars/3.png",
      "images/avatars/4.png",
      "images/avatars/5.png"
    ];

    let currentAvatar = 0;

    // build dots
    avatarImages.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = "avatar-dot";
      dot.dataset.index = idx;
      avatarDots.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll(".avatar-dot"));

    function renderAvatar() {
      avatarImg.src = avatarImages[currentAvatar];
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentAvatar);
      });
    }

    // initial render
    renderAvatar();

    avatarPrev.addEventListener("click", () => {
      currentAvatar = (currentAvatar - 1 + avatarImages.length) % avatarImages.length;
      renderAvatar();
    });

    avatarNext.addEventListener("click", () => {
      currentAvatar = (currentAvatar + 1) % avatarImages.length;
      renderAvatar();
    });

    avatarDots.addEventListener("click", (e) => {
      const dot = e.target.closest(".avatar-dot");
      if (!dot) return;
      const idx = Number(dot.dataset.index);
      currentAvatar = idx;
      renderAvatar();
    });
  }

