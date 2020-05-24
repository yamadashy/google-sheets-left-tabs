// modules
import * as $ from 'jquery/dist/jquery.slim';
import { waitElement } from './content/wait-element';

// constants
const DOCS_EDITOR_CONTAINER_ID = 'docs-editor-container';
const DOCS_EDITOR_CONTAINER_BAR_CLASS = '.docs-sheet-outer-container';

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

    // Add containers
    $tabsWrapper.append($searchContainer);
    $tabsWrapper.append($buttonsContainer);
    $('#' + DOCS_EDITOR_CONTAINER_ID).prepend($tabsWrapper);

    // filter
    // var buttons = document.querySelectorAll(".buttons-container div.left-tab-button");
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

  moveTabs(): void {
    setTimeout(() => {
      // buttons
      $('.buttons-container').append($(".docs-sheet-outer-container"));
      $('.buttons-container').css('height', 700);
    }, 1000);
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

  $(() => {
    sheetTabsMover.moveTabs();
  })
})();
