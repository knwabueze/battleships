/**
 * Handles Ajax for containers/game.js.
 * 
 * @class GameController
 */
class GameController {
    /**
     * Retruns a GamePollPatch describing the resolution of joining a game. 
     * 
     * @static
     * @param {any} lobbyId Lobby Identifier
     * @param {any} userId User Identifier
     * @returns {Promise<GamePollPatch>}
     * @memberof GameController
     */
    static pollLobby(lobbyId, userId) {
        return new Promise(async (resolve, reject) => {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(userId)
            };

            try {
                const response = await fetch(`/api/lobbies/poll/${lobbyId}`, options);
                const gamePollPatch = await response.json();

                return resolve(gamePollPatch);
            } catch (ex) {
                return reject(new Error(ex));
            }            
        });
    }

    /**
     * Returns a ShipPlacementPatch describing the resolution of placing down a ship.
     * 
     * @static
     * @param {any} userId User Identifier
     * @param {any} x X-coordinate
     * @param {any} y Y-coordinate
     * @param {any} ori Orientation
     * @param {any} shipType Type of Ship
     * @param {any} gameId Game Identifier
     * @returns {Promise<ShipPlacementPatch>}
     * @memberof GameController
     */
    static placeShip(userId, x, y, ori, shipType, gameId) {
        return new Promise(async (resolve, reject) => {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ userId, x, y, ori, shipType, gameId })
            }

            try {
                const response = await fetch('/api/games/placeship', options);
                const shipPlacementPatch = await response.json();

                return resolve(shipPlacementPatch);
            } catch (ex) {
                return reject(new Error(ex));
            }
        });
    } 

    static getBoardState(userId, gameId) {
        return new Promise(async (resolve, reject) => {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'GET'
            };

            try {
                const response = await fetch(`/api/games/getboardstate/${userId}/${gameId}`, options);
                const getBoardPatch = await response.json();

                return resolve(getBoardPatch);
            } catch (ex) {
                return reject(new Error(ex));
            }
        });
    }
};

export default GameController;