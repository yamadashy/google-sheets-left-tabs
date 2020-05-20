// Update extension content for slack tabs
chrome.tabs.query({}, (tabs) => {
  for (const tabKey in tabs) {
    const tab = tabs[tabKey];

    // Do not have permission
    if (tab.url === undefined) {
      continue;
    }

    chrome.tabs.executeScript(tab.id, {
      file: 'scripts/content.js',
      runAt: 'document_start',
      allFrames: true
    });
  }
});

