/**
 * SearchingForMatch
 * Pregam
 * Midgame
 * Postgame
 */
var GameState = {};

(function (GameState) {
    GameState[GameState.SearchingForMatch = 0] = "SearchingForMatch";
    GameState[GameState.Pregame = 1] = "Pregame";
    GameState[GameState.Midgame = 2] = "Midgame";
    GameState[GameState.Postgame = 3] = "Postgame";
})(GameState || (GameState = {}));

export default GameState;