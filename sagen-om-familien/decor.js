(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.Decor = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  var DRIP_HEIGHTS = [14, 24, 10, 28, 16, 22, 12, 20];
  var BALLOON_COLORS = ["#e63946", "#2a9d8f", "#f4a300", "#8e44ad", "#3d84f7", "#f77f9b"];

  function createBloodDripBar() {
    var bar = document.createElement("div");
    bar.className = "blood-drip-bar";
    DRIP_HEIGHTS.forEach(function (h) {
      var drip = document.createElement("span");
      drip.className = "drip";
      drip.style.height = h + "px";
      bar.appendChild(drip);
    });
    return bar;
  }

  function renderBalloons() {
    if (document.getElementById("balloon-field")) return;
    var field = document.createElement("div");
    field.id = "balloon-field";
    field.className = "balloon-field";
    for (var i = 0; i < 8; i++) {
      var balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.left = (i * 12 + 4) + "%";
      balloon.style.background = BALLOON_COLORS[i % BALLOON_COLORS.length];
      balloon.style.animationDelay = (i * 0.4) + "s";
      field.appendChild(balloon);
    }
    document.body.appendChild(field);
  }

  return {
    createBloodDripBar: createBloodDripBar,
    renderBalloons: renderBalloons,
  };
});
