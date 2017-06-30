'use strict';

var domainName = 'http://localhost:52697';

(function ($) {
    document.addEventListener('DOMContentLoaded', () => {
        const $username = $('#usernameTextBox');
        const $createlobbybtn = $('#createLobbyButton');
        const $joinlobbybtn = $('#joinLobbyButton');

        sessionStorage.clear();

        $createlobbybtn.addEventListener('click', event => {
            submitButton(function () {
                window.location.pathname = '/create-lobby';
            });
        });

        $joinlobbybtn.addEventListener('click', event => {
            submitButton(function () {
                window.location.pathname = '/join-lobby';
            });
        });

        async function submitButton(callback) {
            const value = $username.value.trim();            

            if (!!value && value !== '') {

                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(value)
                };

                try {
                    const response = await window.fetch(`${domainName}/api/users/register`, options);
                    const user = await response.json();
                    sessionStorage.setItem("currentUser", JSON.stringify(user));
                    callback();
                } catch (ex) {
                    console.error(ex);
                }
            } else {
                alert('Username is required. (Todo: Replace with div)');
            }
        }
    });
})(item => document.querySelector(item));
