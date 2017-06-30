'use strict';

var domainName = 'http://localhost:52697';

(function () {
    window.addEventListener('load', () => {

        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (!!currentUser) {
            sessionStorage.removeItem('currentUser');
        }        

        const usernameTextBox = document.querySelector('#usernameTextBox');
        const createLobbyButton = document.querySelector('#createLobbyButton');
        const joinLobbyButton = document.querySelector('#joinLobbyButton');

        createLobbyButton.addEventListener('click', event => {
            submitButton(event, function () {
                window.location.pathname = '/create-lobby';
            });
        });

        joinLobbyButton.addEventListener('click', event => {
            submitButton(event, function () {
                window.location.pathname = '/join-lobby';
            });
        });

        function submitButton(event, callback) {
            if (usernameTextBox.value.trim() !== '') {
                console.log('hit');
                window.fetch(`${domainName}/api/users/register`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(usernameTextBox.value.trim())

                }).then(response => response.json())
                    .then(user => {
                        receiveRegisterReponse(user)
                        callback();
                    });
            } else {
                alert('Username is required. (Todo: Replace with div)');
            }
        }

        function receiveRegisterReponse(user) {
            console.log(user);
            sessionStorage.setItem("currentUser", JSON.stringify(user));
        }
    });
})();
