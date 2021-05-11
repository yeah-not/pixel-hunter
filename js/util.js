const getDomElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template.trim();
  return element;
};

const mainEl = document.querySelector(`#main`);

const changeScreen = (element) => {
  mainEl.innerHTML = ``;
  mainEl.appendChild(element);
};

export {getDomElement, changeScreen};
