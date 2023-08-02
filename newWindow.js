document.addEventListener('DOMContentLoaded', function() {
    var openLink = document.getElementById('view-journal');
    openLink.addEventListener('click', function() {
      chrome.tabs.create({ url: chrome.runtime.getURL('journal.html') });
    });
  });