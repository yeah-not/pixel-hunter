const getDomElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template.trim();
  return element;
};

export {getDomElement};
