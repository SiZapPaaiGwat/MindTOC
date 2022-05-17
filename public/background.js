chrome.webNavigation.onHistoryStateUpdated.addListener((e) => {
  chrome.tabs.sendMessage(e.tabId, { message: e.url }, (res) => {
    console.log(res.message)
  })
})
