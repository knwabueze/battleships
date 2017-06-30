'use strict';

var domainName = 'http://localhost:52697';

(function ($) {
    window.addEventListener('load', function () {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (!currentUser) {
            window.location.pathname = '/';
        }

        const createLobbyTextBox = $('#createLobbyTextBox');
        const submitButton = $('#submitButton');
        const usernameHeading = $('#usernameHeading');


        usernameHeading.textContent = currentUser.username;

        submitButton.addEventListener('click', event => {
            createLobby(createLobbyTextBox.value, function (json) {
                sessionStorage.setItem("lobbyInfo", JSON.stringify(json));

                window.location.pathname = '/lobby/'
            });
        });

        function createLobby(lobbyName, callback) {
            window.fetch(`${domainName}/api/lobbies/create`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: currentUser.id,
                    lobbyName
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(json => callback(json));
        }
    });
})(item => document.querySelector(item));
