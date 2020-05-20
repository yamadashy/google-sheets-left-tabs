const SELECTOR_DOCS_EDITOR_ID = 'docs-editor';

class SheetTabsMover {
  waitRenderTabs(): Promise<void> {
    return new Promise((resolve) => {
      const loopStartTime = Date.now();

      const checkTabsLoop = (): void => {
        if (document.getElementById(SELECTOR_DOCS_EDITOR_ID)) {
          resolve();
          return;
        }

        // timeout 30 seconds
        if (Date.now() - loopStartTime > 1000 * 30) {
          resolve();
          return;
        }

        setTimeout(checkTabsLoop, 50);
      };

      checkTabsLoop();
    });
  }

  addLeftTabs() {
    // wrapper
    const $tabsWrapper = document.createElement("div");
    $tabsWrapper.classList.add("sheets-left-tabs-wrapper");

    const $searchContainer = document.createElement("div");
    $searchContainer.classList.add("search-container");
    const $buttonsContainer = document.createElement("div");
    $buttonsContainer.classList.add("buttons-container");

    // Add search
    const searchInput = document.createElement('input');
    searchInput.type = "text";
    searchInput.placeholder = "Filter Sheets";
    $searchContainer.appendChild(searchInput);

    // Add buttons
    const $tabs = document.querySelectorAll(".docs-sheet-container-bar .docs-sheet-tab");
    $tabs.forEach(($tab, index) => {
      const leftTabButton = document.createElement('div');
      leftTabButton.classList.add('left-tab-button');
      leftTabButton.innerText = $tab.textContent;

      if (index === 2) {
        leftTabButton.classList.add('active');
      }

      $buttonsContainer.appendChild(leftTabButton);
    });

    // Add containers
    $tabsWrapper.appendChild($searchContainer);
    $tabsWrapper.appendChild($buttonsContainer);
    document.getElementById(SELECTOR_DOCS_EDITOR_ID).prepend($tabsWrapper);

    // // tmp events
    // var buttons = document.querySelectorAll(".buttons-container button");
    // buttons.forEach(function(button) {
    //   button.addEventListener("click", function() {
    //     // button.classList.add("loading");
    //     // google.script.run.withSuccessHandler(function() {
    //     //   buttons.forEach(function(button) {
    //     //     button.classList.remove("active");
    //     //   });
    //     //   button.classList.remove("loading");
    //     //   button.classList.add("active");
    //     // }).withFailureHandler(function() {
    //     //   button.classList.remove("loading");
    //     // }).selectSheetByName(this.innerText);
    //   });
    // });
    //
    // document.querySelector(".search-container input").addEventListener("keyup", function() {
    //   var inputValue = this.value;
    //   var regInputValue = new RegExp(inputValue.split("").join(".*"), "i");
    //
    //   buttons.forEach(function(button) {
    //     if (inputValue === "" || regInputValue.test(button.textContent)) {
    //       button.classList.remove("hide");
    //     } else {
    //       button.classList.add("hide");
    //     }
    //   });
    // });

  }
}

(async (): Promise<void> => {
  const sheetTabsMover = new SheetTabsMover();
  await sheetTabsMover.waitRenderTabs();
  sheetTabsMover.addLeftTabs();
})();
