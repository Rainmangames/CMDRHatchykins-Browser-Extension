const originalChannelName = 'CMDRHatch';
const newChannelName = 'Hatchykins';
let timeoutId;

function renameChannel() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    console.log('Script is running');

    // Offline selector
    const offlineElements = document.querySelectorAll('#offline-channel-main-content > div.Layout-sc-1xcs6mc-0.dehlJN.home-header-sticky > div.Layout-sc-1xcs6mc-0.dGvaUO > div.Layout-sc-1xcs6mc-0.jskmre > div.Layout-sc-1xcs6mc-0.hdoiLi > a > div > h1');
    
    // Online selector
    const onlineElements = document.querySelectorAll('#live-channel-stream-information > div > div > div.Layout-sc-1xcs6mc-0.dRGOOY > div > div.Layout-sc-1xcs6mc-0.evfzyg > div.Layout-sc-1xcs6mc-0.denZNh.metadata-layout__support > div.Layout-sc-1xcs6mc-0.jjAyLi > div > a > h1');
    
    // Search bar selector
    const searchBarElements = document.querySelectorAll('#root > div > div.Layout-sc-1xcs6mc-0.lcpZLv > div > main > div.root-scrollable.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div.Layout-sc-1xcs6mc-0.cVmNmw > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div > div > div.Layout-sc-1xcs6mc-0.hPUFxY.search-result-offline_channel--body > div.Layout-sc-1xcs6mc-0.kprwFK > div.Layout-sc-1xcs6mc-0.laLhvt > div > strong > a');

    const allElements = [...offlineElements, ...onlineElements, ...searchBarElements];

    console.log('Channel elements found:', allElements.length);

    allElements.forEach(element => {
      const trimmedText = element.textContent.trim();
      console.log('Original text content:', trimmedText);
      if (trimmedText === originalChannelName) {
        console.log('Renaming element to:', newChannelName);
        element.textContent = newChannelName;
      }
    });
  }, 300);
}

const observer = new MutationObserver(renameChannel);
observer.observe(document.body, { childList: true, subtree: true });

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  renameChannel();
});

window.addEventListener('load', () => {
  console.log('load event fired');
  renameChannel();
});

renameChannel();
