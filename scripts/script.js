window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const welcomeText = document.getElementById("animated-text");
  const mainLine = document.getElementById("main-line");
  const subLine = document.getElementById("sub-line");
  const mainContent = document.getElementById("main-content");
  const text1 = "Welcome to Bengal Travista";
  const text2 = "Travel Wide, Feel Alive";
  let index1 = 0;
  let index2 = 0;

  // 1. Hide loader with fade-out
  loader.classList.add("fade-out");
  setTimeout(() => {
    loader.style.display = "none";
    welcomeText.style.display = "flex"; // show the welcome message screen

    // 2. Start typing animation
    typeLetter();
  }, 1000); // match fade-out transition

  function initAOS() {
    AOS.init({
      duration: 800, // animation duration in ms
      easing: "ease-in-out", // animation easing
      once: false, // animate every time (true = only once)
      mirror: true, // animate out when scrolling past
    });
  }

  function typeLetter() {
    if (index1 < text1.length) {
      mainLine.innerHTML += text1.charAt(index1);
      index1++;
      setTimeout(typeLetter, 60); // typing speed
    } 
    if (index2 < text2.length) {
      setTimeout(() =>{
        subLine.innerHTML += text2.charAt(index2);
        index2++;
        setTimeout(typeLetter, 60);},1800)
      } else {
      // 3. Show main content after typing is complete
      setTimeout(() => {
        welcomeText.classList.add("fade-out");
        setTimeout(() => {
          welcomeText.style.display = "none";
          mainContent.style.display = "block";
          initAOS();
        }, 800); // match fade-out
      }, 600); // small pause after typing
    }
  }
});
