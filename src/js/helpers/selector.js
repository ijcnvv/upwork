import { delay, debounce, getMin, getFormattedTime } from "./system";

const bbClassName = "__bb-summary-table";
let hash = {};

export const getElementBySelector = (selector) => {
  const target = document.querySelector(selector);
  if (!target) return delay(500).then(() => getElementBySelector(selector));
  return target;
};

const getFormattedSummary = () => {
  let total = 0;
  return Object.values(hash).reduce((acc, { label, time, href }) => {
    total += time;
    return {
      ...acc,
      [label]: { label, href, time: getFormattedTime(time) },
      TOTAL: getFormattedTime(total),
    };
  }, {});
};

const addToHash = (node, hours) => {
  const label = node.textContent.trim();
  const href = node.href;

  if (!hash[label]) {
    hash[label] = {
      label,
      href,
      time: getMin(hours),
    };
  } else {
    const prev = hash[label].time;
    hash[label] = {
      label,
      href,
      time: prev + getMin(hours),
    };
  }
};

const resetHash = () => {
  hash = {};
};

const drawSammary = (table) => {
  const summaryTable = document.querySelector(`.${bbClassName}`);
  const { TOTAL, ...rest } = getFormattedSummary();

  if (!TOTAL) return;

  const data = Object.values(rest)
    .map(({ label, time, href }) => {
      return `<tr><th><a href="${href}">${label}</a></th><th>${time}</th></tr>`;
    })
    .join("");

  const html = `
      <table class='up-table'>
        <tbody>
          ${data}
          <tr><th>TOTAL</th><th>${TOTAL}</th></tr>
        </tbody>
      </table>
    `;

  if (summaryTable) {
    summaryTable.innerHTML = html;
  } else {
    const div = document.createElement("div");
    div.className = "table-responsive __bb-summary-table";
    div.innerHTML = html;
    table.parentElement.parentElement.prepend(div);
  }
};

const prepareHash = (table) => {
  Array.from(table.querySelectorAll("tr")).forEach((tr) => {
    const label = tr.querySelector(".column-id-assignment a");
    const hours = tr.querySelector(".column-id-hours")?.textContent;

    if (label && hours) {
      addToHash(label, hours);
    }
  });
};

const processData = (mutation) => {
  const table = document.querySelector(".reporting-table");

  const isBB = mutation.target.classList.contains(bbClassName);
  if (!table || isBB) return;

  resetHash();
  prepareHash(table);
  drawSammary(table);
};

export const debouncedCb = debounce(processData);
