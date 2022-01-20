const ANSWERS_NUM = 10;

const LiveValue = {
  MIN: 0,
  MAX: 3
};

const ScoreBonus = {
  CORRECT: 100,
  TIME: 50,
  LIFE: 50
};

const Time = {
  FAST: 10,
  SLOW: 20,
  MAX: 30
};

export default (answers, lives) => {
  if (answers === undefined || lives === undefined) {
    throw new Error(`Не переданы данные - массив ответов и/или число жизней`);
  }

  if (!(answers instanceof Array)) {
    throw new Error(`Должен быть передан массив ответов`);
  }

  if (!Number.isInteger(lives) || lives < LiveValue.MIN) {
    throw new Error(`Число жизней должно быть положительным целым числом`);
  }

  if (answers.length !== ANSWERS_NUM || lives > LiveValue.MAX) {
    return -1;
  }

  let score = 0;

  answers
    .filter((it) => it.isCorrect)
    .forEach((it) => {
      if (it.time >= 30) {
        return;
      }

      score += ScoreBonus.CORRECT;

      if (it.time < Time.FAST) {
        score += ScoreBonus.TIME;
      }

      if (it.time > Time.SLOW) {
        score -= ScoreBonus.TIME;
      }
    });

  score += lives * ScoreBonus.LIFE;

  return score;
};
