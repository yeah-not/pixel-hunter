import {assert} from 'chai';
import countScore from './count-score.js';

const ordinaryAnswers = Array(10).fill({isCorrect: true, time: 15});
const fastAnswers = Array(10).fill({isCorrect: true, time: 5});
const slowAnswers = Array(10).fill({isCorrect: true, time: 25});
const differentTimeAnswers = [
  ...Array(4).fill({isCorrect: true, time: 5}),
  ...Array(3).fill({isCorrect: true, time: 15}),
  ...Array(3).fill({isCorrect: true, time: 25}),
];
const differentAnswers = [
  ...Array(3).fill({isCorrect: false, time: 15}),
  ...Array(7).fill({isCorrect: true, time: 15}),
];
const differentTimeAndAnswers = [
  ...Array(5).fill({isCorrect: false, time: 5}),
  ...Array(3).fill({isCorrect: true, time: 15}),
  ...Array(2).fill({isCorrect: true, time: 25}),
];
const lackOfAnswers = Array(5).fill({isCorrect: true, time: 15});
const lackOfDifferentAnswers = [
  ...Array(3).fill({isCorrect: false, time: 15}),
  ...Array(3).fill({isCorrect: true, time: 5}),
  ...Array(3).fill({isCorrect: true, time: 25}),
];
const excessOfDifferentAnswers = [
  ...Array(3).fill({isCorrect: false, time: 15}),
  ...Array(7).fill({isCorrect: true, time: 5}),
  ...Array(3).fill({isCorrect: true, time: 25}),
];
const lackOfTimeAnswers = [
  ...Array(5).fill({isCorrect: true, time: 15}),
  ...Array(5).fill({isCorrect: true, time: 35})
];


describe(`Count game score`, () => {
  // Валидные данные
  it(`Считает очки: все ответы правильные, среднее время, все жизни`, () => {
    assert.equal(countScore(ordinaryAnswers, 3), 1150);
  });
  it(`Считает очки: все ответы правильные, быстрые, 2 жизни`, () => {
    assert.equal(countScore(fastAnswers, 2), 1600);
  });
  it(`Считает очки: все ответы правильные, медленные, 0 жизней`, () => {
    assert.equal(countScore(slowAnswers, 0), 500);
  });
  it(`Считает очки: все ответы правильные, разное время, 1 жизнь`, () => {
    assert.equal(countScore(differentTimeAnswers, 1), 1100);
  });
  it(`Считает очки: 7 ответов правильных, среднее время, все жизни`, () => {
    assert.equal(countScore(differentAnswers, 3), 850);
  });
  it(`Считает очки: 5 ответов правильных, разное время, 1 жизнь`, () => {
    assert.equal(countScore(lackOfTimeAnswers, 3), 650);
  });
  it(`Считает очки: все ответы правильные, но 5 - время больше 30с (не засчитываются), 3 жизни`, () => {
    assert.equal(countScore(differentTimeAndAnswers, 1), 450);
  });

  // Невалидные данные
  it(`Возвращает -1: пустой массив ответов, все жизни`, () => {
    assert.equal(countScore([], 3), -1);
  });
  it(`Возвращает -1: жизней > 3, разные ответы`, () => {
    assert.equal(countScore(differentAnswers, 5), -1);
  });
  it(`Возвращает -1: мало ответов - 5, среднее время, все жизни`, () => {
    assert.equal(countScore(lackOfAnswers, 3), -1);
  });
  it(`Возвращает -1: мало ответов - 9, разное время, 0 жизней`, () => {
    assert.equal(countScore(lackOfDifferentAnswers, 0), -1);
  });
  it(`Возвращает -1: избыток ответов - 13, разное время, 2 жизни`, () => {
    assert.equal(countScore(excessOfDifferentAnswers, 2), -1);
  });

  // Некорректные данные
  it(`Выдает ошибку: не переданы значения`, () => {
    assert.throws(() => countScore());
    assert.throws(() => countScore(undefined, 5));
    assert.throws(() => countScore([]));
    assert.throws(() => countScore(ordinaryAnswers));
  });
  it(`Выдает ошибку: некорректный формат данных`, () => {
    assert.throws(() => countScore(1, 1));
    assert.throws(() => countScore({}, 2));
    assert.throws(() => countScore(``, 3));
    assert.throws(() => countScore([], -1));
    assert.throws(() => countScore([], 1.5));
    assert.throws(() => countScore([], null));
    assert.throws(() => countScore([], `3`));
  });
});
