(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.Logic = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  var HINT_PENALTY_MS = 3 * 60 * 1000;

  function normalizeCode(input) {
    return String(input).trim().toUpperCase();
  }

  function checkCode(sag, input) {
    return normalizeCode(input) === normalizeCode(sag.kode);
  }

  function createInitialState() {
    return {
      startedAt: null,
      solved: [],
      hintsUsed: [],
    };
  }

  function startState(state) {
    if (state.startedAt) return state;
    return Object.assign({}, state, { startedAt: Date.now() });
  }

  function markSolved(state, sagId) {
    if (state.solved.indexOf(sagId) !== -1) return state;
    return Object.assign({}, state, { solved: state.solved.concat(sagId) });
  }

  function useHint(state, sagId) {
    if (state.hintsUsed.indexOf(sagId) !== -1) return state;
    return Object.assign({}, state, { hintsUsed: state.hintsUsed.concat(sagId) });
  }

  function isSolved(state, sagId) {
    return state.solved.indexOf(sagId) !== -1;
  }

  function allSolved(state, sager) {
    return sager.every(function (s) {
      return state.solved.indexOf(s.id) !== -1;
    });
  }

  function elapsedMs(state, now) {
    if (!state.startedAt) return 0;
    var base = now - state.startedAt;
    var penalty = state.hintsUsed.length * HINT_PENALTY_MS;
    return base + penalty;
  }

  function formatDuration(ms) {
    var totalSeconds = Math.max(0, Math.floor(ms / 1000));
    var m = Math.floor(totalSeconds / 60);
    var s = totalSeconds % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  function nextUnsolvedIndex(state, sager) {
    for (var i = 0; i < sager.length; i++) {
      if (state.solved.indexOf(sager[i].id) === -1) return i;
    }
    return -1;
  }

  return {
    HINT_PENALTY_MS: HINT_PENALTY_MS,
    normalizeCode: normalizeCode,
    checkCode: checkCode,
    createInitialState: createInitialState,
    startState: startState,
    markSolved: markSolved,
    useHint: useHint,
    isSolved: isSolved,
    allSolved: allSolved,
    elapsedMs: elapsedMs,
    formatDuration: formatDuration,
    nextUnsolvedIndex: nextUnsolvedIndex,
  };
});
