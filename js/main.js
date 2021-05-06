'use strict';

const mainEl = document.querySelector(`#main`);
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

const showScreen = (index) => {
  removeChildren(mainEl);
  mainEl.appendChild(SCREENS[index].cloneNode(true));
};

showScreen(0);
