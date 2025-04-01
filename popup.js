document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("clipboard-list");
  const clearAllBtn = document.getElementById("clear-all");
  const searchBox = document.getElementById("search-box");


  // Load clipboard history from storage
  function loadClipboardHistory() {
    chrome.storage.sync.get("clipboardHistory", (data) => {
      list.innerHTML = "";
      const history = data.clipboardHistory || [];
      const searchTerm = searchBox.value.toLowerCase();

      history.forEach((item, index) => {
        if (item.toLowerCase().includes(searchTerm)) {
          const li = document.createElement("li");
          li.textContent = item;
          li.addEventListener("click", () => {
            navigator.clipboard.writeText(item).then(() => {
              alert("Copied to clipboard!");
            });
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "X";
          deleteBtn.style.float = "right";
          deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            history.splice(index, 1);
            chrome.storage.sync.set({ clipboardHistory: history }, loadClipboardHistory);
          });

          li.appendChild(deleteBtn);
          list.appendChild(li);
        }
      });
    });
  }

  // Clear all clipboard history
  clearAllBtn.addEventListener("click", () => {
    chrome.storage.sync.set({ clipboardHistory: [] }, loadClipboardHistory);
  });



  // Search functionality
  searchBox.addEventListener("input", loadClipboardHistory);

  loadClipboardHistory();
});
