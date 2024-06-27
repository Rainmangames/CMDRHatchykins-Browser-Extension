chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('twitch.tv')) {
    chrome.storage.sync.get(['isEnabled'], function(data) {
      if (data.isEnabled) {
        chrome.tabs.sendMessage(tabId, { action: 'initialize' }, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          }
        });
      }
    });
  }
});
