import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

let page = 1;
let matches = books;

/**
 * Creates preview elements based on the given books data, authors data, container selector, and books per page.
 *
 * @param {Array} books - The array of books data.
 * @param {Object} authors - The object containing author data.
 * @param {string} containerSelector - The selector for the container element.
 * @param {number} booksPerPage - The number of books to display per page.
 * @return {void}
 */
function booksPreview(books, authors, containerSelector, booksPerPage) {
  const container = document.querySelector(containerSelector);
  const starting = document.createDocumentFragment();

  /**
   * Creates a preview element with the given book information.
   *
   * @param {Object} book - The book object containing author, id, image, and title.
   * @return {HTMLElement} The created preview element.
   */
  const booksPreview = ({ author, id, image, title }) => {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
        <img
          class="preview__image"
          src="${image}"
        />
        
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      `;

    return element;
  };

  const previewElements = books.slice(0, booksPerPage).map(booksPreview);

  previewElements.forEach((element) => starting.appendChild(element));

  container.appendChild(starting);
}
// Callback function that initialises the preview for each of the books //
booksPreview(books, authors, "[data-list-items]", BOOKS_PER_PAGE);

/**
 * Opens the search overlay and initializes the genres and authors dropdown menus.
 */
function openSearchOverlay() {
  // Code to toggle the search overlay and to activate the search //
  document
    .querySelector("[data-header-search]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = true;
      document.querySelector("[data-search-title]").focus();
    });

  // Code to populate the genres and authors dropdown menus //
  const genreHtml = document.createDocumentFragment();
  const firstGenreElement = document.createElement("option");
  firstGenreElement.value = "any";
  firstGenreElement.innerText = "All Genres";
  genreHtml.appendChild(firstGenreElement);

  for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
  }

  document.querySelector("[data-search-genres]").appendChild(genreHtml);

  const authorsHtml = document.createDocumentFragment();
  const firstAuthorElement = document.createElement("option");
  firstAuthorElement.value = "any";
  firstAuthorElement.innerText = "All Authors";
  authorsHtml.appendChild(firstAuthorElement);

  for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
  }

  document.querySelector("[data-search-authors]").appendChild(authorsHtml);

  // Code to handle cancel button to close the overlay//
  document
    .querySelector("[data-search-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = false;
    });
}
openSearchOverlay();

/**
 * Updates the show more button in the list view.
 *
 * @param {Array<Object>} books - The list of books.
 * @param {number} page - The current page.
 * @param {Array<Object>} matches - The list of books that match the current search.
 * @param {number} BOOKS_PER_PAGE - The number of books per page.
 * @param {HTMLElement} listButton - The show more button element.
 */
function showMoreButton(books, page, matches, BOOKS_PER_PAGE, listButton) {
  listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
  listButton.disabled = matches.length - page * BOOKS_PER_PAGE > 0;

  listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })</span>
  `;
}

showMoreButton(
  books,
  page,
  matches,
  BOOKS_PER_PAGE,
  document.querySelector("[data-list-button]")
);

/**
 * Toggles the theme settings based on the selected theme.
 *
 * @param {Event} event - The event object.
 */
function toggleThemeSettings(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === "night") {
    setTheme("255, 255, 255", "10, 10, 20");
  } else {
    setTheme("10, 10, 20", "255, 255, 255");
  }

  document.querySelector("[data-settings-overlay]").open = false;
}

// Event listener for the cancel button in the data setting overlay //
document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = false;
  });

// Event listener for opening the data setting overlay //
document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true;
  });
// Event listener for closing the data setting overlay //
document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});

/**
 * A function to set the theme colors for the document.
 *
 * @param {string} colorDark - The dark color value to set.
 * @param {string} colorLight - The light color value to set.
 */
function setTheme(colorDark, colorLight) {
  document.documentElement.style.setProperty("--color-dark", colorDark);
  document.documentElement.style.setProperty("--color-light", colorLight);
}

/**
 * Adds an event listener to the element with the attribute "data-settings-form"
 * for the "submit" event, and attaches the "toggleThemeSettings" function as the
 * event handler.
 */
document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", toggleThemeSettings);

document
  .querySelector("[data-search-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
      let genreMatch = filters.genre === "any";

      for (const singleGenre of book.genres) {
        if (genreMatch) break;
        if (singleGenre === filters.genre) {
          genreMatch = true;
        }
      }

      if (
        (filters.title.trim() === "" ||
          book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === "any" || book.author === filters.author) &&
        genreMatch
      ) {
        result.push(book);
      }
    }

    page = 1;
    matches = result;

    if (result.length < 1) {
      document
        .querySelector("[data-list-message]")
        .classList.add("list__message_show");
    } else {
      document
        .querySelector("[data-list-message]")
        .classList.remove("list__message_show");
    }

    document.querySelector("[data-list-items]").innerHTML = "";
    const newItems = document.createDocumentFragment();

    for (const { author, id, image, title } of result.slice(
      0,
      BOOKS_PER_PAGE
    )) {
      const element = document.createElement("button");
      element.classList = "preview";
      element.setAttribute("data-preview", id);

      element.innerHTML = `
                <img
                    class="preview__image"
                    src="${image}"
                />

                <div class="preview__info">
                    <h3 class="preview__title">${title}</h3>
                    <div class="preview__author">${authors[author]}</div>
                </div>
            `;

      newItems.appendChild(element);
    }

    document.querySelector("[data-list-items]").appendChild(newItems);

    showMoreButton(
      books,
      page,
      matches,
      BOOKS_PER_PAGE,
      document.querySelector("[data-list-button]")
    );

    //     document.querySelector("[data-list-button]").disabled =
    //       matches.length - page * BOOKS_PER_PAGE < 1;

    //     document.querySelector("[data-list-button]").innerHTML = `
    //         <span>Show more</span>
    //         <span class="list__remaining"> (${
    //           matches.length - page * BOOKS_PER_PAGE > 0
    //             ? matches.length - page * BOOKS_PER_PAGE
    //             : 0
    //         })</span>
    //     `;

    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector("[data-search-overlay]").open = false;
  });

// document.querySelector("[data-list-button]").addEventListener("click", () => {
//   const fragment = document.createDocumentFragment();

//   for (const { author, id, image, title } of matches.slice(
//     page * BOOKS_PER_PAGE,
//     (page + 1) * BOOKS_PER_PAGE
//   )) {
//     const element = document.createElement("button");
//     element.classList = "preview";
//     element.setAttribute("data-preview", id);

//     element.innerHTML = `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />

//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[author]}</div>
//             </div>
//         `;

//     fragment.appendChild(element);
//   }

//   document.querySelector("[data-list-items]").appendChild(fragment);
//   page += 1;
// });

// Call back function to preview the books after search//
booksPreview(books, authors, "[data-list-items]", BOOKS_PER_PAGE);

document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        let result = null;

        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }

        active = result;
      }
    }

    if (active) {
      document.querySelector("[data-list-active]").open = true;
      document.querySelector("[data-list-blur]").src = active.image;
      document.querySelector("[data-list-image]").src = active.image;
      document.querySelector("[data-list-title]").innerText = active.title;
      document.querySelector("[data-list-subtitle]").innerText = `${
        authors[active.author]
      } (${new Date(active.published).getFullYear()})`;
      document.querySelector("[data-list-description]").innerText =
        active.description;
    }
  });
