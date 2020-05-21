export function waitElement(selector: string, timeout: number): Promise<void> {
  return new Promise((resolve, reject) => {
    let observer: MutationObserver = null;
    let timeoutId: number = null;

    // Found element
    if (document.querySelector(selector)) {
      return resolve();
    }

    // Observe element
    observer = new MutationObserver((): void => {
      // Found element
      if (document.querySelector(selector)) {
        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }

        resolve();
        observer.disconnect();
      }
    });

    // Timeout
    timeoutId = window.setTimeout((): void => {
      observer.disconnect();
      reject();
    }, timeout);

    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
  });
}
