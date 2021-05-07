const SCREENS = [
  document.querySelector(`#intro`).content,
  document.querySelector(`#greeting`).content,
  document.querySelector(`#rules`).content,
  document.querySelector(`#game-2`).content,
  document.querySelector(`#game-1`).content,
  document.querySelector(`#game-3`).content,
  document.querySelector(`#stats`).content,
];

const removeChildren = (el, selector) => {
  selector = selector || `*`;
  let child;

  while ((child = el.querySelector(selector))) {
    el.removeChild(child);
  }
};

const mainEl = document.querySelector(`#main`);
let currentScreen = 0;

const showScreen = (index) => {
  if (index >= SCREENS.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = SCREENS.length - 1;
  }

  removeChildren(mainEl);
  mainEl.appendChild(SCREENS[index].cloneNode(true));

  currentScreen = index;
};

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey === true || evt.ctrlKey === true || evt.shiftKey === true) {
    return;
  }

  switch (evt.code) {
    case `ArrowRight`:
      evt.preventDefault();
      showScreen(currentScreen + 1);
      break;
    case `ArrowLeft`:
      evt.preventDefault();
      showScreen(currentScreen - 1);
      break;
  }
});

const bodyEl = document.querySelector(`body`);
const arrowsEl = document.createElement(`div`);

arrowsEl.classList.add(`arrows__wrap`);
arrowsEl.innerHTML = `
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
`;

const arrowBtns = arrowsEl.querySelectorAll(`.arrows__btn`);
const arrowLeft = arrowBtns[0];
const arrowRight = arrowBtns[1];

arrowLeft.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  showScreen(currentScreen - 1);
});

arrowRight.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  showScreen(currentScreen + 1);
});

bodyEl.appendChild(arrowsEl);

showScreen(0);
