function renameTextNodes(node, newName) {
  if (node.nodeType === Node.TEXT_NODE) {
    const regex = /CMDRHatch/gi; // Case insensitive
    if (regex.test(node.nodeValue)) {
      console.log('Renaming text node:', node.nodeValue);
      node.nodeValue = node.nodeValue.replace(regex, newName);
    }
  } else {
    node.childNodes.forEach(child => renameTextNodes(child, newName));
  }
}

function renameChannel(newName) {
  console.log('Script is running');
  try {
    const body = document.body;
    if (body) {
      renameTextNodes(body, newName);
    } else {
      console.error('No body element found.');
    }
  } catch (error) {
    console.error('Error renaming channel:', error);
  }
}

function initialize() {
  chrome.storage.sync.get(['newName'], function(data) {
    if (data.newName) {
      renameChannel(data.newName);
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'initialize') {
    console.log('Received initialize message');
    try {
      initialize();
      sendResponse({ status: 'initialized' });
    } catch (error) {
      console.error('Error during initialization:', error);
      sendResponse({ status: 'error', message: error.message });
    }
  }
  return true; // Keep the messaging channel open for sendResponse
});

// Observe for changes to the DOM and rename nodes as needed
const observer = new MutationObserver(() => {
  chrome.storage.sync.get(['newName'], function(data) {
    if (data.newName) {
      renameChannel(data.newName);
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

initialize();
