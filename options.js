document.getElementById('nameSelect').addEventListener('change', function() {
  const customNameInput = document.getElementById('customName');
  if (this.value === 'custom') {
    customNameInput.style.display = 'block';
  } else {
    customNameInput.style.display = 'none';
  }
});

document.getElementById('saveBtn').addEventListener('click', function() {
  const nameSelect = document.getElementById('nameSelect').value;
  let newName;

  if (nameSelect === 'custom') {
    newName = document.getElementById('customName').value.trim();
  } else {
    newName = nameSelect;
  }

  if (newName) {
    chrome.storage.sync.set({ newName }, function() {
      console.log('Name setting saved');
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.reload(activeTab.id, function() {
          window.close();
        });
      });
    });
  } else {
    alert('Please enter a custom name');
  }
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
      const nameSelect = document.getElementById('nameSelect');
      const customNameInput = document.getElementById('customName');
      if (data.newName === 'Hatchykins' || data.newName === 'Hatchypoo') {
        nameSelect.value = data.newName;
        customNameInput.style.display = 'none';
      } else {
        nameSelect.value = 'custom';
        customNameInput.style.display = 'block';
        customNameInput.value = data.newName;
      }
    }
    if (data.isEnabled !== undefined) {
      document.getElementById('toggleBtn').innerText = data.isEnabled ? 'Turn Off' : 'Turn On';
    } else {
      document.getElementById('toggleBtn').innerText = 'Turn Off';
      chrome.storage.sync.set({ isEnabled: true });
    }
  });
});
