(function () {
  var root = document.getElementById("app");
  var phase = "intro"; // intro -> countdown -> ambient -> finale

  function render() {
    root.innerHTML = "";
    if (phase === "intro") renderIntro();
    else if (phase === "countdown") renderCountdown();
    else if (phase === "ambient") renderAmbient();
    else if (phase === "finale") renderFinale();
  }

  function renderIntro() {
    var wrap = document.createElement("div");
    wrap.className = "tv-screen tv-intro";
    wrap.appendChild(Decor.createBloodDripBar());

    var title = document.createElement("h1");
    title.textContent = "SAGEN OM FAMILIEN";
    wrap.appendChild(title);

    var sub = document.createElement("p");
    sub.textContent = "Fire hold. Otte sager. Én stor hemmelighed, der venter på at blive afsløret.";
    wrap.appendChild(sub);

    var rules = document.createElement("p");
    rules.textContent = "Ingen koder er, hvad de ser ud til at være: nogle skal regnes ud, andre skal læses omvendt. Brug hovedet -- eller et hint, hvis I sidder fast.";
    wrap.appendChild(rules);

    var btn = document.createElement("button");
    btn.className = "btn btn-start";
    btn.textContent = "Start nedtælling";
    btn.addEventListener("click", function () {
      phase = "countdown";
      render();
    });
    wrap.appendChild(btn);

    root.appendChild(wrap);
  }

  function renderCountdown() {
    var wrap = document.createElement("div");
    wrap.className = "tv-screen tv-countdown";
    wrap.appendChild(Decor.createBloodDripBar());
    var count = document.createElement("div");
    count.className = "countdown-number";
    wrap.appendChild(count);
    root.appendChild(wrap);

    var secondsLeft = 10;
    count.textContent = String(secondsLeft);
    var interval = setInterval(function () {
      secondsLeft -= 1;
      if (secondsLeft <= 0) {
        clearInterval(interval);
        phase = "ambient";
        render();
        return;
      }
      count.textContent = String(secondsLeft);
    }, 1000);
  }

  function renderAmbient() {
    var wrap = document.createElement("div");
    wrap.className = "tv-screen tv-ambient";
    wrap.appendChild(Decor.createBloodDripBar());

    var title = document.createElement("h1");
    title.textContent = "EFTERFORSKNINGEN ER I GANG";
    wrap.appendChild(title);

    var sub = document.createElement("p");
    sub.textContent = "Begge hold er ude i lejligheden. God jagt.";
    wrap.appendChild(sub);

    var finaleBox = document.createElement("form");
    finaleBox.className = "finale-trigger";

    var label = document.createElement("label");
    label.textContent = "Når et hold har opklaret sagen, indtast den sidste kode her:";
    finaleBox.appendChild(label);

    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Sidste kode";
    input.autocomplete = "off";
    finaleBox.appendChild(input);

    var submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "btn";
    submit.textContent = "Opklar sagen for familien";
    finaleBox.appendChild(submit);

    var feedback = document.createElement("div");
    feedback.className = "feedback";
    finaleBox.appendChild(feedback);

    finaleBox.addEventListener("submit", function (e) {
      e.preventDefault();
      if (Logic.checkCode(Gaader.FINALE, input.value)) {
        phase = "finale";
        render();
      } else {
        feedback.textContent = "Forkert kode — prøv igen.";
        input.value = "";
      }
    });

    wrap.appendChild(finaleBox);
    root.appendChild(wrap);
  }

  function renderFinale() {
    Decor.renderBalloons();
    var wrap = document.createElement("div");
    wrap.className = "tv-screen tv-finale";

    var stamp = document.createElement("div");
    stamp.className = "stamp stamp-big";
    stamp.textContent = "SAGEN ER OPKLARET";
    wrap.appendChild(stamp);

    var hilsen = document.createElement("h1");
    hilsen.textContent = Gaader.FINALE.hilsen;
    wrap.appendChild(hilsen);

    root.appendChild(wrap);
  }

  render();
})();
