const accessKey = "fjZcmUEdXdJwmZQ_hotBWifILO1ZDJ41FMBkNovuVPw";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-result");
const showMoreBtn = document.getElementById("show-more-button");

let page = 1;

async function searchImages() {
  const inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      searchResultsEl.innerHTML = ""; // Clear previous search results
    }

    data.results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");
      
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;
      
      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResultsEl.appendChild(imageWrapper);
    });

    page++;
    showMoreBtn.style.display = "block";
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  searchImages();
});
