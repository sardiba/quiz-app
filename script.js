const homePage = document.querySelector("#home");
const createPage = document.querySelector("#create-question");
const bookmarkPage = document.querySelector("#bookmarks");
const profilePage = document.querySelector("#profile");

const homeButton = document.querySelector(".link-home");
const createButton = document.querySelector(".link-create-question");
const bookmarkButton = document.querySelector(".link-bookmarks");
const profileButton = document.querySelector(".link-profile");

homeButton.addEventListener("click", () => {
  homePage.classList.add("current");
  createPage.classList.remove("current");
  bookmarkPage.classList.remove("current");
  profilePage.classList.remove("current");
});
createButton.addEventListener("click", () => {
  createPage.classList.add("current");
  homePage.classList.remove("current");
  bookmarkPage.classList.remove("current");
  profilePage.classList.remove("current");
});
bookmarkButton.addEventListener("click", () => {
  bookmarkPage.classList.add("current");
  createPage.classList.remove("current");
  homePage.classList.remove("current");
  profilePage.classList.remove("current");
});
profileButton.addEventListener("click", () => {
  profilePage.classList.add("current");
  createPage.classList.remove("current");
  bookmarkPage.classList.remove("current");
  homePage.classList.remove("current");
});
