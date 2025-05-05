document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("faq-search-form");
    const input = document.getElementById("faq-search-input");
    const resultsContainer = document.getElementById("faq-results");
  
    let helpData = [];
  
    // Load the external JSON file
    fetch("../utils/help.json")
      .then(response => response.json())
      .then(data => {
        helpData = shuffleArray(data.help_questions);
        displayFAQs(helpData); // Show shuffled list
      })
      .catch(error => {
        console.error("Failed to load help_questions.json", error);
        resultsContainer.innerHTML = "<p>Error loading FAQs.</p>";
      });
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const query = input.value.toLowerCase().trim();
      resultsContainer.innerHTML = "";
  
      if (!query || helpData.length === 0) {
        displayFAQs(helpData);
        return;
      }
  
      const results = helpData.filter(item =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
      );
  
      if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
      }
  
      displayFAQs(results);
    });
  
    // Fisher-Yates shuffle
    function shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
  
    function displayFAQs(faqs) {
      resultsContainer.innerHTML = "";
  
      faqs.forEach(item => {
        const card = document.createElement("div");
        card.className = "card mb-3 shadow-sm border-0";
        card.innerHTML = `
          <div class="card-body" data-aos="slide-up">
            <h5 class="card-title" style="color: rgb(226, 122, 43);">${item.question}</h5>
            <p class="card-text text-secondary">${item.answer}</p>
          </div>
        `;
        resultsContainer.appendChild(card);
      });
    }
  });