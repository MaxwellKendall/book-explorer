export const removeClass = (el, className) => { el.classList.remove(className); };
export const addClass = (el, className) => { el.classList.add(className); };
export const createElement = (el, className) => { const newElement = document.createElement(el); newElement.classList.add(className); return newElement; };
export const preventDefault = (event) => {
  event.preventDefault();
};
