import { getElementBySelector, debouncedCb } from "./helpers/selector";

(() => {
  getElementBySelector("#__layout").then((target) => {
    const observer = new MutationObserver((mutations) => {
      const hasWeeklySummary = window.location.pathname.indexOf(
        "freelancer/weekly-summary"
      );
      if (hasWeeklySummary === -1) return;
      mutations.forEach(debouncedCb);
    });

    const config = { childList: true, subtree: true };

    observer.observe(target, config);
  });
})();
