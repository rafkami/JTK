// export default
!(function($_x, _s, id) {
  var js,
    fjs = $_x.getElementsByTagName(_s)[0];
  if (!$_x.getElementById(id)) {
    js = $_x.createElement(_s);
    js.id = id;
    js.src = "/src/js/zl_full.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
})(document, "script", "zl-widget-s");
