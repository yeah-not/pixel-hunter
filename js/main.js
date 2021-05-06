'use strict';

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
  let childEl;

  while ((childEl = el.querySelector(selector))) {
    el.removeChild(childEl);
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

showScreen(0);
