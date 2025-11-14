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
      id: 4,
      img: "images/4.png",
      caption: "Reason #4 –You make my entire world feel lighter the second you walk into it."
    },
    {
      id: 5,
      img: "images/5.png",
      caption: "Reason #5 – You understand parts of me I’ve never been able to explain to anyone else."
    },
    {
      id: 6,
      img: "images/6.png",
      caption: "Reason #6 – You understand my moods, my silences, my chaos — and you never run from it."
    },
    {
      id: 7,
      img: "images/7.png",
      caption: "Reason #7 – You celebrate my wins like they’re your own, and you hold me during my losses."
    },
    {
      id: 8,
      img: "images/8.png",
      caption: "Reason #8 – You bring out the playful, soft, ridiculous version of me that no one else gets to see."
    },
    {
      id: 9,
      img: "images/9.png",
      caption: "Reason #9 – You make me feel appreciated in small, quiet ways that I’ll never forget."
    },
    {
      id: 10,
      img: "images/10.png",
      caption: "Reason #10 –You forgive me gently, and you love me loudly."
    },
        {
      id: 11,
      img: "images/11.png",
      caption: "Reason #11 –You teach me what patience, understanding, and real partnership look like."
    },
    {
      id: 12,
      img: "images/12.png",
      caption: "Reason #12 –You make me feel like the luckiest man every time I look at you."
    },
    {
      id: 13,
      img: "images/13.png",
      caption: "Reason #13 – You’re my comfort person, my chaos partner, my safe space, and my favorite adventure."
    },
    {
      id: 14,
      img: "images/14.png",
      caption: "Reason #14 – You’re the only person who can make me laugh even when I’m genuinely pissed or stressed."
    },
    {
      id: 15,
      img: "images/15.png",
      caption: "Reason #15 – Coz you're Autistic"
    },
    {
      id: 16,
      img: "images/16.png",
      caption: "Reason #16 – Only person who loves me despite my Hangry side"
    },
    {
      id: 17,
      img: "images/17.png",
      caption: "Reason #17 – Because you're the best driver AAHAHAHAHHAHAAH (after me)"
    },
    {
      id: 18,
      img: "images/18.png",
      caption: "Reason #18 – Because you're a Lil Funny"
    },
    {
      id: 19,
      img: "images/19.png",
      caption: "Reason #19 – Coz you smell so YUMMMM"
    },
    {
      id: 20,
      img: "images/20.png",
      caption: "Reason #20 – Because you're YOUUU (I ran out of reasons sorry)"
    },
    {
      id: 21,
      img: "images/21.png",
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
      "images/avatars/8.png",
      "images/avatars/2.png",
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

