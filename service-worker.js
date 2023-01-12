// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

console.log("This prints to the console of the service worker (background script)");

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(sender);
  console.log(message);
  if (message.closeThis) {
    CLOSE_SUPPLIER_WEBSITE(sender.tab.id);
  }
});

const CLOSE_SUPPLIER_WEBSITE = (id) => {
  //   chrome.tabs.remove(id);
  console.log("run CLOSE_SUPPLIER_WEBSITE");
  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      if (
        tabs[i].url.includes("my.api.net.au") ||
        tabs[i].url.includes("hts.symbionhealth.com") ||
        tabs[i].url.includes("ch2.net.au")
      ) {
        chrome.tabs.remove(tabs[i].id);
      }
    }
  });
};

// Importing and using functionality from external files is also possible.
importScripts("service-worker-utils.js");

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.
