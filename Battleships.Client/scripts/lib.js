'use strict';
var domainName = 'http://localhost:52697';

const Lib = (function () {
    class GameInitializationPatch {
        constructor(statusCode, gameId, opponentName) {
            this.statusCode = statusCode;
            this.gameId = gameId;
            this.opponentName = opponentName;
        }
    }

    async function pollLobby(lobbyId, playerId) {
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerId)
        }

        const response = await window.fetch(`${domainName}/api/lobbies/poll/${lobbyId}`, options);
        const data = await response.json();

        return new GameInitializationPatch(data.statusCode, data.gameId, data.opponentName);
    }

    return {
        pollLobby
    };
})();