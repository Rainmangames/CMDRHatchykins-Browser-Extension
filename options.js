document.getElementById('saveBtn').addEventListener('click', function() {
  const newName = document.getElementById('nameSelect').value;
  chrome.storage.sync.set({ newName }, function() {
    console.log('Name setting saved');
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      chrome.tabs.reload(activeTab.id, function() {
        window.close();
      });
    });
  });
});

document.getElementById('toggleBtn').addEventListener('click', function() {
  chrome.storage.sync.get(['isEnabled'], function(data) {
    const isEnabled = !data.isEnabled;
    chrome.storage.sync.set({ isEnabled }, function() {
      console.log('Extension ' + (isEnabled ? 'enabled' : 'disabled'));
      document.getElementById('toggleBtn').innerText = isEnabled ? 'Turn Off' : 'Turn On';
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['newName', 'isEnabled'], function(data) {
    if (data.newName) {
      document.getElementById('nameSelect').value = data.newName;
    }
    if (data.isEnabled !== undefined) {
      document.getElementById('toggleBtn').innerText = data.isEnabled ? 'Turn Off' : 'Turn On';
    } else {
      document.getElementById('toggleBtn').innerText = 'Turn Off';
      chrome.storage.sync.set({ isEnabled: true });
    }
  });
});
