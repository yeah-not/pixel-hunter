// Игровой экран - Интро
// ---------------------

import {getDomElement, changeScreen} from './util.js';
import screenGreeting from './screen-greeting.js';

const template = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;

const element = getDomElement(template);
const asteriskBtn = element.querySelector(`.intro__asterisk`);

asteriskBtn.addEventListener(`click`, () => changeScreen(screenGreeting));

export default element;
