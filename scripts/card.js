fetch("../utils/bengal_travista.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("card-sections");

    data.forEach((place) => {
      // Create section wrapper
      const section = document.createElement("div");
      section.classList.add("mb-5");
      const sectionId = place.destination.toLowerCase().replace(/\s+/g, "-");
      section.setAttribute("id", sectionId);

      // Section title
      const title = `
          <h2 class="my-4">${place.destination}</h2>
          <div class="row g-4">
            ${place.spots
              .map((spot) => {
                const mapQuery = `${spot.name}, ${place.destination}, West Bengal, India`;
                const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  mapQuery
                )}`;
                return `
              <div class="col-12 col-sm-6 col-md-4 col-lg-3" data-aos="fade-in">
                <div class="card h-100">
                  <img src="${spot.image}" loading="lazy" class="card-img-top" alt="${spot.name}">
                  <div class="card-body">
                    <h5 class="card-title">${spot.name}</h5>
                    <p class="card-text">Explore the beauty of ${spot.name} in ${place.destination}.</p>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">${spot.category}</li>
                    <li class="list-group-item">W.B. Tourism</li>
                  </ul>
                  <div class="card-body">
                    <a href="#" class="card-link">More Info</a>
                    <a href="${mapLink}" target="_blank" class="card-link">Map</a>
                  </div>
                </div>
              </div>
            `;
              })
              .join("")}
          </div>
        `;

      section.innerHTML = title;
      container.appendChild(section);
    });
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });
// SEARCH FORM FUNCTIONALITY
document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.getElementById("search-input");
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  // Try to scroll to a destination section
  const sectionId = query.replace(/\s+/g, "-");
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    section.classList.add("bg-warning", "p-2", "rounded");
    setTimeout(() => {
      section.classList.remove("bg-warning", "p-2", "rounded");
    }, 2000);
    return;
  }

  // Try to find a matching card title
  const cards = document.querySelectorAll(".card");
  let found = false;
  cards.forEach((card) => {
    const title =
      card.querySelector(".card-title")?.textContent.toLowerCase() || "";
    if (title.includes(query)) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("border", "border-success", "border-3");
      setTimeout(() => {
        card.classList.remove("border", "border-success", "border-3");
      }, 2000);
      found = true;
    }
  });

  if (!found) {
    alert("Sorry, we couldn't find a matching place or spot.");
  }

  input.value = "";
});
