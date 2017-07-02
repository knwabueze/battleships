'use strict';

var domainName = 'http://localhost:52697';

(function ($) {
    window.addEventListener('load', function () {

        // Check if currentUser is cached in sessionStorage, otherwise send them back to '/'
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.pathname = '/';
        }

        // Instantiate 
        const $usernameHeader = $('#usernameHeader');
        const $lobbyTable = $('#lobbyTable>tbody');

        $usernameHeader.textContent = currentUser.username;

        grabAllLobbies(data => grabAllLobbiesCallback(data, $lobbyTable, currentUser));
    })
})(item => document.querySelector(item));



async function grabAllLobbies(callback) {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    const response = await window.fetch(`${domainName}/api/lobbies/all`, options);
    const data = await response.json();

    callback(data);
}

function grabAllLobbiesCallback(data, lobbyTable, currentUser) {
    for (let val of data) {
        // Grab template from script tag
        const $template = document.querySelector('#table-row-template');

        // Parse from markup into plain text
        let templateHTML = $template.innerHTML;

        // Use object destructuring syntax for ease
        const { lobbyId, createdAt, lobbyName, hostUsername } = val;

        // Parse and replace all mustaches with variabless
        templateHTML = templateHTML
            .replace(/{{lobbyId}}/g, lobbyId)
            .replace(/{{createdAt}}/g, createdAt)
            .replace(/{{lobbyName}}/g, lobbyName)
            .replace(/{{hostName}}/g, hostUsername);

        // Create new node to insert
        const $node = document.createElement('template');
        $node.innerHTML = templateHTML;

        // Node to be inserted
        const $insertNode = document.importNode($node.content, true);

        // Append markup to lobbyTable node
        lobbyTable.appendChild($insertNode);

        // Select the newly selected node by data-id
        const $newlyInsertedNode = document.querySelector(`[data-id='${lobbyId}']`);

        // Bind a click event listener to that element
        $newlyInsertedNode.addEventListener('click', async function () {
            const { id: userId } = currentUser;

            const val = {
                lobbyId,
                createdAt,
                lobbyName,
                hostUsername
            };

            const statusCode = await joinLobby({ lobbyId: lobbyId, userId });

            if (statusCode === 0) {
                sessionStorage.setItem("currentLobby", JSON.stringify(val));
                window.location.href = '/game';
            }
        });
    }
}

function joinLobby({ lobbyId, userId }) {
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
            const response = await window.fetch(`${domainName}/api/lobbies/join/${lobbyId}`, options);
            const data = await response.json();

            return resolve(data);
        } catch (ex) {
            return reject(ex);
        }
    });
}