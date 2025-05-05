
  let currentRating = 0;

  // Load saved values or start fresh
  let ratingCount = parseInt(localStorage.getItem("ratingCount")) || 0;
  let ratingSum = parseInt(localStorage.getItem("ratingSum")) || 0;

  const stars = document.querySelectorAll('#stars i');
  const emoji = document.getElementById('emoji-feedback');
  const commentInput = document.getElementById('comment');
  const avgRatingDisplay = document.getElementById('avg-rating');
  const ratingCountDisplay = document.getElementById('rating-count');
  const thankYou = document.getElementById('thank-you');

  const emojiMap = {
    1: "Terrible! 😞",
    2: "Could be better 😕",
    3: "Okay! 🙂",
    4: "Good! 😃",
    5: "Amazing! 🤩"
  };

  // Show existing stats on load
  updateStats();

  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = +star.getAttribute('data-value');
      highlightStars(val);
      showEmoji(val);
    });

    star.addEventListener('click', () => {
      currentRating = +star.getAttribute('data-value');
      highlightStars(currentRating);
      showEmoji(currentRating);
    });
  });

  document.getElementById('stars').addEventListener('mouseleave', () => {
    highlightStars(currentRating);
    showEmoji(currentRating);
  });

  function highlightStars(rating) {
    stars.forEach(star => {
      const val = +star.getAttribute('data-value');
      star.classList.toggle('text-warning', val <= rating);
      star.classList.toggle('text-secondary', val > rating);
    });
  }

  function showEmoji(rating) {
    emoji.textContent = emojiMap[rating] || "";
  }

  function updateStats() {
    const average = ratingCount === 0 ? 0 : (ratingSum / ratingCount).toFixed(1);
    avgRatingDisplay.textContent = average;
    ratingCountDisplay.textContent = ratingCount;
  }

  document.getElementById('submit-rating').addEventListener('click', () => {
    if (currentRating === 0) {
      alert("Please select a rating.");
      return;
    }

    const comment = commentInput.value.trim();
    ratingCount++;
    ratingSum += currentRating;

    // Save to localStorage
    localStorage.setItem("ratingCount", ratingCount);
    localStorage.setItem("ratingSum", ratingSum);

    updateStats();
    thankYou.textContent = "Thank you for your support!";

    if (comment) console.log("User comment:", comment);

    currentRating = 0;
    commentInput.value = "";
    highlightStars(0);
    showEmoji(0);
  });

