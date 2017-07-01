'use strict';

var domainName = 'http://localhost:52697';

(function ($) {
    window.addEventListener('load', function () {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (!currentUser) {
            window.location.pathname = '/';
        }

        const $text = $('#createLobbyTextBox');
        const $submit = $('#submitButton');
        const $usernameHeading = $('#usernameHeading');


        $usernameHeading.textContent = currentUser.username;

        $submit.addEventListener('click', event => {
            createLobby($text.value, function (json) {

                const val = Object.assign({}, json, { hostUsername: currentUser.username });

                sessionStorage.setItem("currentLobby", JSON.stringify(val));

                window.location.href = '/game'
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
