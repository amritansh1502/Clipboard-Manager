// content.js: Listen for copy events and store copied text

document.addEventListener('copy', (event) => {
  // Get the text currently copied to the clipboard
  navigator.clipboard.readText().then((text) => {
      // Send the copied text to the background service worker for storage
      chrome.runtime.sendMessage({ action: "copy", text: text });

      // Optionally: You can also highlight the copied text on the page
      highlightCopiedText(event.target);
  }).catch((error) => {
      console.error('Failed to read clipboard contents: ', error);
  });
});

// Function to visually highlight the copied text on the webpage
function highlightCopiedText(targetElement) {
  // If the target element is a text node, we need to handle it
  if (targetElement && targetElement.nodeType === 3) {
      const range = window.getSelection().getRangeAt(0);
      const span = document.createElement('span');
      span.style.backgroundColor = 'yellow'; // Highlight color
      range.surroundContents(span);
  }
}
