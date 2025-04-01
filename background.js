chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("clipboardHistory", (data) => {
      if (!data.clipboardHistory) {
          chrome.storage.sync.set({ clipboardHistory: [] });
      }
  });
});

// Listen for messages from content.js (clipboard events)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "copy") {
      const copiedText = message.text;

      // Store the copied text in Chrome's sync storage
      chrome.storage.sync.get("clipboardHistory", (data) => {
          let history = data.clipboardHistory || [];

          // Prevent duplicates in history
          if (!history.includes(copiedText)) {
              history.unshift(copiedText);  // Add new copied text to the top
              chrome.storage.sync.set({ clipboardHistory: history });
          }
      });
  }
});
