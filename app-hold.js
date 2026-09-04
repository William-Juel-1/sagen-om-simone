(function () {
  var params = new URLSearchParams(window.location.search);
  var team = params.get("team");
  var teamLabel = team === "2" ? "Hold 2" : "Hold 1";
  var storageKey = "sagen-om-simone:team:" + (team === "2" ? "2" : "1");

  var root = document.getElementById("app");
  var state = loadState();
  var timerInterval = null;

  function loadState() {
    var raw = localStorage.getItem(storageKey);
    if (!raw) return Logic.createInitialState();
    try {
      return JSON.parse(raw);
    } catch (e) {
      return Logic.createInitialState();
    }
  }

  function saveState(newState) {
    state = newState;
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function render() {
    root.innerHTML = "";

    var header = document.createElement("div");
    header.className = "team-header";
    header.textContent = teamLabel;
    root.appendChild(header);

    if (!state.startedAt) {
      renderStartScreen();
      return;
    }

    var timerEl = document.createElement("div");
    timerEl.className = "timer";
    timerEl.id = "timer";
    root.appendChild(timerEl);
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    if (!Logic.allSolved(state, Gaader.SAGER)) {
      var idx = Logic.nextUnsolvedIndex(state, Gaader.SAGER);
      renderSag(Gaader.SAGER[idx]);
    } else if (!Logic.isSolved(state, Gaader.FINALE.id)) {
      renderFinalePrompt();
    } else {
      renderFinaleScreen();
    }
  }

  function updateTimer() {
    var timerEl = document.getElementById("timer");
    if (!timerEl) return;
    timerEl.textContent = Logic.formatDuration(Logic.elapsedMs(state, Date.now()));
  }

  function renderStartScreen() {
    var btn = document.createElement("button");
    btn.className = "btn btn-start";
    btn.textContent = "Start efterforskningen";
    btn.addEventListener("click", function () {
      saveState(Logic.startState(state));
      render();
    });
    root.appendChild(btn);
  }

  function renderCodeForm(sag, onCorrect) {
    var form = document.createElement("form");
    form.className = "code-form";

    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Indtast koden";
    input.autocomplete = "off";
    form.appendChild(input);

    var submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "btn";
    submit.textContent = "Løs sagen";
    form.appendChild(submit);

    var feedback = document.createElement("div");
    feedback.className = "feedback";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (Logic.checkCode(sag, input.value)) {
        onCorrect();
      } else {
        feedback.textContent = "Forkert kode — prøv igen.";
        input.value = "";
        input.focus();
      }
    });

    return { form: form, feedback: feedback };
  }

  function renderHintBlock(sag) {
    var hintUsed = state.hintsUsed.indexOf(sag.id) !== -1;
    if (hintUsed) {
      var hintText = document.createElement("p");
      hintText.className = "hint-text";
      hintText.textContent = "Hint: " + sag.hint;
      return hintText;
    }
    var hintBtn = document.createElement("button");
    hintBtn.className = "btn btn-hint";
    hintBtn.textContent = "Få hint (+3 min)";
    hintBtn.addEventListener("click", function () {
      saveState(Logic.useHint(state, sag.id));
      render();
    });
    return hintBtn;
  }

  function renderSag(sag) {
    var card = document.createElement("div");
    card.className = "case-card";

    var titel = document.createElement("h2");
    titel.textContent = "Sag " + sag.id + ": " + sag.titel;
    card.appendChild(titel);

    var rum = document.createElement("div");
    rum.className = "case-room";
    rum.textContent = sag.rum;
    card.appendChild(rum);

    var tekst = document.createElement("p");
    tekst.textContent = sag.tekst;
    card.appendChild(tekst);

    var codeParts = renderCodeForm(sag, function () {
      saveState(Logic.markSolved(state, sag.id));
      render();
    });
    card.appendChild(codeParts.form);
    card.appendChild(codeParts.feedback);
    card.appendChild(renderHintBlock(sag));

    root.appendChild(card);
  }

  function renderFinalePrompt() {
    var sag = Gaader.FINALE;
    var card = document.createElement("div");
    card.className = "case-card finale-card";

    var titel = document.createElement("h2");
    titel.textContent = sag.titel;
    card.appendChild(titel);

    var tekst = document.createElement("p");
    tekst.textContent = sag.tekst;
    card.appendChild(tekst);

    var codeParts = renderCodeForm(sag, function () {
      saveState(Logic.markSolved(state, sag.id));
      render();
    });
    codeParts.form.querySelector("button").textContent = "Opklar sagen";
    card.appendChild(codeParts.form);
    card.appendChild(codeParts.feedback);
    card.appendChild(renderHintBlock(sag));

    root.appendChild(card);
  }

  function renderFinaleScreen() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    var card = document.createElement("div");
    card.className = "case-card finale-solved";

    var stamp = document.createElement("div");
    stamp.className = "stamp";
    stamp.textContent = "SAGEN ER OPKLARET";
    card.appendChild(stamp);

    var hilsen = document.createElement("p");
    hilsen.textContent = Gaader.FINALE.hilsen;
    card.appendChild(hilsen);

    var stats = document.createElement("p");
    stats.className = "stats";
    var hintCount = state.hintsUsed.length;
    stats.textContent =
      "Samlet tid: " +
      Logic.formatDuration(Logic.elapsedMs(state, Date.now())) +
      " (inkl. " + hintCount + (hintCount === 1 ? " hint" : " hints") + ")";
    card.appendChild(stats);

    var henvisning = document.createElement("p");
    henvisning.className = "physical-pointer";
    henvisning.textContent = Gaader.FINALE.fysiskHenvisning;
    card.appendChild(henvisning);

    root.appendChild(card);
  }

  render();
})();
