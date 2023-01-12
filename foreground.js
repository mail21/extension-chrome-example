// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

const main = () => {
  console.log("content Main");
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */

  // check url
  //   document.body.onload = function () {
  //     document.body.innerHTML += "<h1>HELLO</h1>";
  //     // document.getElementById("ctl00_cplMain_btnRegister").click();
  //     // document.getElementById("UserName").value = "Elon";
  //     // document.getElementsByClassName("_42ft _4jy0 _6lth _4jy6 _4jy1 selected _51sy")[0].click();
  //   };

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    var activeTabUrl = activeTab.url;
    // do something with the active tab url
    console.log(activeTabUrl, "activeTabUrl");
  });

  window.addEventListener(
    "message",
    (event) => {
      //   Only accept messages from ourselves
      if (event.source !== window) return;

      if (event.data.type && event.data.type === "CLOSE_SUPPLIER_WEBSITE") {
        // console.log("Content script received CLOSE_SUPPLIER_WEBSITE event");
        chrome.runtime.sendMessage({ closeThis: true });
      }
    },
    false
  );
};

main();
