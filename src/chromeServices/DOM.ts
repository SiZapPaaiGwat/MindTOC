function reddenPage() {
  document.body.style.backgroundColor = "red";
}

chrome.action.onClicked.addListener((tab) => {
  const url = tab.url || "";
  if (!url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id || 0 },
      func: reddenPage,
    });
  }
});

export {};
