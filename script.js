// const homePage = document.querySelector("#home");
// const createPage = document.querySelector("#create-question");
// const bookmarkPage = document.querySelector("#bookmarks");
// const profilePage = document.querySelector("#profile");

// const homeButton = document.querySelector(".link-home");
// const createButton = document.querySelector(".link-create-question");
// const bookmarkButton = document.querySelector(".link-bookmarks");
// const profileButton = document.querySelector(".link-profile");

const pageList = document.querySelectorAll(".page");
const linkList = document.querySelectorAll(".footer-nav-button");

// NAV LONG WAY:
// homeButton.addEventListener("click", () => {
//   homePage.classList.add("current");
//   createPage.classList.remove("current");
//   bookmarkPage.classList.remove("current");
//   profilePage.classList.remove("current");
// });

//NAV SHORTER WAY:
// homeButton.addEventListener("click", () => {
//   pageList.forEach((inactivePage) => {
//     inactivePage.classList.remove("current");
//   });
//   homePage.classList.add("current");
// });

//NAV LOOP:
linkList.forEach((link) => {
  link.addEventListener("click", () => {
    pageList.forEach((inactivePage) => {
      inactivePage.classList.remove("current");
    });
    const hrefAttribute = link.getAttribute("href");
    const activePage = document.querySelector(hrefAttribute);
    activePage.classList.add("current");
  });
});
//NAV ICON ACTIVE:
const navIconList = document.querySelectorAll(".nav-button-icon");
for (i = 0; i < navIconList.length; i++) {
  navIconList[i].addEventListener("click", function () {
    navIconList.forEach((inactiveIcon) => {
      inactiveIcon.classList.remove("active-icon");
    });
    this.classList.add("active-icon");
  });
}

//SUBMIT NEW QUESTIONS:
// let question = {};
// form.addEventListener("submit", (event) => {
//   console.log("form submitted", event);
//   console.log(form.elements.question);
//   console.log(form.elements.answer);
//   console.log(form.elements.tag);
//   question = {
//     question: form.elements.question.value,
//     answer: form.elements.answer.value,
//     tags: form.elements.tag.value,
//   };
//   console.log(question);
//   event.preventDefault();  //preventing the form being submitted to server
// });
const form = document.querySelector("form");
// const questionList = [
//   {
//     question: "qwerty",
//     answer: "ghjkl",
//     tags: "asdf ghjk lmno",
//     isBookmarked: false,
//   },
//   {
//     question: "lol",
//     answer: "leeeeeeeeel",
//     tags: "lul lol lal",
//     isBookmarked: false,
//   },
//   {
//     question: "hallooooooooo",
//     answer: "hollaaaa",
//     tags: "haha hihi huhu hoho",
//     isBookmarked: false,
//   },
//   {
//     question: "thank you",
//     answer: "you're welcome",
//     tags: "hi hey hai huhu",
//     isBookmarked: false,
//   },
// ];

const createQuestionHtml = (questions) => {
  let html = "";
  questions.forEach((input, index) => {
    let tags = "";
    const bookmarkedClass = input.isBookmarked ? " bookmark-black" : "";
    const tagArray = input.tags.split(" ");
    tagArray.forEach((item) => {
      tags = tags + `<li class="tag">${item}</li>`;
    });
    html =
      html +
      `<div class="dark question-card">
        <h3 class="question-card__title">Question ${index + 1}</h3>
        <button class="bookmark ${bookmarkedClass}">
          <img
            class="bookmark-icon"
            src="images/white-bookmark.png"
            alt="bookmark"
            data-index= ${index}
          />
        </button>
        <p>
          ${input.question}
        </p>
        <button class="collapse-answer-button" type="button" data-index= ${index}>
          Show Answer
        </button>
        <p class="answer">
          ${input.answer}
        </p>
        <ul>
         ${tags}
        </ul>
      </div>`;
  });
  return html;
};
// console.log(createQuestionHtml(questionList));

const renderQuestions = () => {
  //Take the array from the local storage insteaad of questionList
  let questions;

  if (localStorage.getItem("questions")) {
    questions = JSON.parse(localStorage.getItem("questions"));
  } else {
    questions = [
      {
        question: "qwerty",
        answer: "ghjkl",
        tags: "asdf ghjk lmno",
        isBookmarked: false,
      },
      {
        question: "lol",
        answer: "leeeeeeeeel",
        tags: "lul lol lal",
        isBookmarked: false,
      },
      {
        question: "hallooooooooo",
        answer: "hollaaaa",
        tags: "haha hihi huhu hoho",
        isBookmarked: false,
      },
      {
        question: "thank you",
        answer: "you're welcome",
        tags: "hi hey hai huhu",
        isBookmarked: false,
      },
    ]; // <-- initial value goes here
    localStorage.setItem("questions", JSON.stringify(questions));
  }
  //   const questionHtml = createQuestionHtml(questionList);
  const questionHtml = createQuestionHtml(questions); //change array questionList to const questions

  const questionContainer = document.querySelector("#homeQuestionContainer");
  questionContainer.innerHTML = questionHtml;
  // BOOKMARK CHANGE COLOR:
  const bookmarkList = document.querySelectorAll(".bookmark");
  for (i = 0; i < bookmarkList.length; i++) {
    bookmarkList[i].addEventListener("click", function () {
      this.classList.toggle("bookmark-black");
      //   console.log(this);
      //   console.log(this.childNodes[1].getAttribute("data-index"));
      const dataIndex = this.childNodes[1].getAttribute("data-index");
      //TOOGLE THE BOOKMARK
      let questions = JSON.parse(localStorage.getItem("questions"));
      questions[dataIndex].isBookmarked = !questions[dataIndex].isBookmarked;
      localStorage.setItem("questions", JSON.stringify(questions));

      const bookmarkedQuestions = questions.filter((question) => {
        return question.isBookmarked;
      });

      //SHOW BOOKMARKED QUESTIONSCARD IN BOOKMARK PAGE
      const bookmarkQuestionContainer = document.querySelector(
        "#bookmarkQuestionContainer"
      );
      const bookmarkedQuestionsHtml = createQuestionHtml(bookmarkedQuestions);
      bookmarkQuestionContainer.innerHTML = bookmarkedQuestionsHtml;
    });
  }

  //COLLAPSE ANSWER:
  const collapseAnswer = document.querySelectorAll(".collapse-answer-button");
  for (i = 0; i < collapseAnswer.length; i++) {
    collapseAnswer[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  questionList.push({
    question: form.elements.question.value,
    answer: form.elements.answer.value,
    tags: form.elements.tag.value,
    isBookmarked: false,
  });

  renderQuestions();
  form.reset();
});

renderQuestions();
