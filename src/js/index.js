import { getElementBySelector, debouncedCb } from "./helpers/selector";

(() => {
  getElementBySelector("#__layout").then((target) => {
    const observer = new MutationObserver((mutations) =>
      mutations.forEach(debouncedCb)
    );

    const config = { childList: true, subtree: true };

    observer.observe(target, config);
  });
})();
