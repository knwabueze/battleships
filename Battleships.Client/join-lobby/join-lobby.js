'use strict';

var domainName = 'http://localhost:52697';

(function ($) {
    window.addEventListener('load', function () {
        const usernameHeader = $('#usernameHeader');
        const lobbyTable = $('#lobbyTable>tbody');

        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (!currentUser) {
            window.location.pathname = '/';
        }

        usernameHeader.textContent = currentUser.username;

        grabAllLobbies(data => grabAllLobbiesCallback(data, lobbyTable, currentUser));
    })
})(item => document.querySelector(item));

function joinLobby({ id, userId }, callback) {
    window.fetch(`${domainName}/api/lobbies/join/${id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userId)
    })
        .then(response => response.json())
        .then(json => callback(json))
}

function grabAllLobbies(callback) {
    window.fetch(`${domainName}/api/lobbies/all`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            callback(data);
        })
}

function grabAllLobbiesCallback(data, lobbyTable, currentUser) {
    data.forEach((val, idx) => {
        const el = document.createElement('tr');

        el.dataset['id'] = val.lobbyId;
        el.dataset['createdAt'] = val.createdAt;
        el.dataset['lobbyName'] = val.lobbyName;
        el.dataset['hostName'] = val.hostName;

        const hostNameEl = document.createElement('td');
        const lobbyNameEl = document.createElement('td');
        const createdAtEl = document.createElement('td');

        hostNameEl.textContent = val.hostUsername;
        lobbyNameEl.textContent = val.lobbyName;
        createdAtEl.textContent = val.createdAt;

        el.appendChild(hostNameEl);
        el.appendChild(lobbyNameEl);
        el.appendChild(createdAtEl);

        el.classList.add('table-row');

        el.addEventListener('click', event => {
            let capturedEl = el;

            console.log(currentUser.id);

            joinLobby({
                id: Number.parseInt(capturedEl.dataset['id']),
                userId: currentUser.id
            }, json => {
                if (status === -1) {
                    console.error('error');
                } else {
                    console.log(status, json);
                }
            });
        });

        lobbyTable.appendChild(el);
    });
}