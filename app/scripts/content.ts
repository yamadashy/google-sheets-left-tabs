// modules
import * as $ from 'jquery/dist/jquery.slim';
import { waitElement } from './content/wait-element';

// constants
const DOCS_EDITOR_CONTAINER_ID = 'docs-editor-container';
const DOCS_EDITOR_CONTAINER_BAR_CLASS = '.docs-sheet-container-bar';

class SheetTabsMover {
  waitRenderTabs(): Promise<void> {
    return waitElement(DOCS_EDITOR_CONTAINER_BAR_CLASS, 30 * 1000);
  }

  addLeftTabs(): void {
    // wrapper
    const $tabsWrapper = $('<div>');
    $tabsWrapper.addClass('sheets-left-tabs-wrapper');

    const $searchContainer = document.createElement('div');
    $searchContainer.classList.add('search-container');
    const $buttonsContainer = $('<div>');
    $buttonsContainer.addClass('buttons-container');

    // Add search
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Filter Sheets';
    $searchContainer.appendChild(searchInput);

    // Add buttons
    const $tabs = $('.docs-sheet-container-bar .docs-sheet-tab');
    $tabs.each((index, tab) => {
      const $tab = $(tab);
      const $leftTabButton = $('<div>');
      $leftTabButton.addClass('left-tab-button');
      $leftTabButton.text($tab.text());

      if ($tab.hasClass('docs-sheet-active-tab')) {
        $leftTabButton.addClass('active');
      }

      // event
      $leftTabButton.on('click', () => {
        const $tab = $('.docs-sheet-container-bar .docs-sheet-tab').eq(index);
        console.log($tab);
        console.log(123);
        $tab.trigger('mouseover');
        $tab.trigger('click');
      });

      $buttonsContainer.append($leftTabButton);
    });

    // Add containers
    $tabsWrapper.append($searchContainer);
    $tabsWrapper.append($buttonsContainer);
    $('#' + DOCS_EDITOR_CONTAINER_ID).prepend($tabsWrapper);

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

    var buttons = document.querySelectorAll(".buttons-container div.left-tab-button");
    document.querySelector(".search-container input").addEventListener("keyup", function() {
      var inputValue = this.value;
      var regInputValue = new RegExp(inputValue.split("").join(".*"), "i");

      buttons.forEach(function(button) {
        if (inputValue === "" || regInputValue.test(button.textContent)) {
          button.classList.remove("hide");
        } else {
          button.classList.add("hide");
        }
      });
    });

  }
}

(async (): Promise<void> => {
  const sheetTabsMover = new SheetTabsMover();
  await sheetTabsMover.waitRenderTabs()
    .then(() => {
      sheetTabsMover.addLeftTabs();
    })
    .catch(() => {
      // Nothing to do
    });
})();
