var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?16da047dd1b99f98fb58d332c05d7c13";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

document.onkeydown = function(event) {
  if (event.keyCode == 123) {
    return false;
  } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
    return false;
  }
};

document.oncontextmenu = function(event) {
  event.preventDefault();
};
