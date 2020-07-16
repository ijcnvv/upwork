export const delay = (ms) => {
  return new Promise((r) => setTimeout(r, ms));
};

export const debounce = (fn, ms = 300) => {
  let timer;

  return function () {
    const arg = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, ms);
  };
};

export const getMin = (t) => {
  const rq = /(\d+)\:(\d+)/.exec(t);

  if (!rq) return 0;

  return +rq[1] * 60 + +rq[2];
};

export const getFormattedTime = (t) => {
  const time = t > 0 ? t : 0;
  const hours = Math.floor(time / 60);
  const minutes = Math.floor(time - hours * 60);

  const _hours = hours < 10 ? `0${hours}` : hours;
  const _minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${_hours}:${_minutes}`;
};
