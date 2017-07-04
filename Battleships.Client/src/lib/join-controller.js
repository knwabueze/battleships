import fetch from 'isomorphic-fetch';

const joinController = {
    fetchLobbies: function () {
        return new Promise(async (resolve, reject) => {
            const options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            };

            try {
                const response = await fetch('/api/lobbies/all', options);
                const data = await response.json();
                return resolve(data);
            } catch (ex) {
                return reject(new Error(ex));
            }            
        });
    },

    /**
     * Attempt to join a lobby by id.
     * 
     * @param {any} id The id of the lobby that should be joined.
     * @param {any} userId The userId of the currentUser from the last page.
     * @returns {int} statusCode Either 0 or -1 representing if the operation failed or succeeded.
     * @memberof JoinController
     */
    joinLobby: function (id, userId) {
        return new Promise(async (resolve, reject) => {
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userId)
            };

            try {
                const response = await fetch(`/api/lobbies/join/${id}`, options);
                const statusCode = response.json();
                return resolve(statusCode);
            } catch (ex) {
                return reject(new Error(ex));
            }
        });
    }
};

export default joinController;