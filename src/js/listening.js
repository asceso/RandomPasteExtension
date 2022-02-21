var clickedEl = null;
document.addEventListener("mousedown", function (event) {
  //right click
  if (event.button == 2) {
    clickedEl = event.target;
  }
}, true);
chrome.runtime.onMessage.addListener(function (request) {
  clickedEl.value = request.text;
});