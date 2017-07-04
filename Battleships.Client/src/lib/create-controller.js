import fetch from 'isomorphic-fetch';

const createController = {
    /**
     * @typedef {Object} CreateLobbyPatch
     * @property {Date} createdAt The backend-generated timestamp signifying when the lobby was created.
     * @property {string} lobbyName The chosen lobby name of the user who decided to create the lobby.
     * @property {number} lobbyId The lobby-id chosen to be used to interface with the server-side with.
     */
    /**
     * Create a lobby based off of name and currentUser Id
     * 
     * @param {any} userId The user id retrieved from '/' route.
     * @param {any} lobbyName The name of the game/lobby the user chooses.
     * @returns {CreateLobbyPatch}
     */
    createLobby: function (userId, lobbyName) {
        return new Promise(async (resolve, reject) => {
            const options = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    userId,
                    lobbyName
                })
            }

            try {
                const response = await fetch('/api/lobbies/create', options);
                const lobbyInfo = await response.json();

                return resolve(lobbyInfo);
            } catch (ex) {
                return reject(new Error(ex));
            }            
        });
    }
};

export default createController;