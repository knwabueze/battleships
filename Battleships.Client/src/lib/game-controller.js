class GameController {
    /**
     * Returns a GamePollPatch object that signifies if a match has been found.
     * 
     * @param {int} lobbyId, The id of the currentLobby that a user is in.
     * @param {int} userId, The id of the currentUser.
     * @returns {Promise} This promise returns a GamePollPatch object. 
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

    static placeShip(userId, x, y, ori, shipType, gameId) {

    } 
};

export default GameController;