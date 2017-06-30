'use strict';

(function ($) {
    document.addEventListener('DOMContentLoaded', function () {
        // Check if currentUser element and lobbyId is in sessionStorage
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        const currentLobby = JSON.parse(sessionStorage.getItem("currentLobby"));

        if (!currentUser && !currentLobby) {
            window.location.href = '/';
        }

        populateLobbyTemplate(currentLobby, $);
        populateVersusTemplate(currentUser, $);

        const stopInterval = setInterval(async () => {
            const gameInitializationPatch = await Lib.pollLobby(currentLobby.lobbyId, currentUser.id);

            if (gameInitializationPatch.statusCode === 0) {
                window.clearInterval(stopInterval);
                console.log(gameInitializationPatch);

                clearVersusTemplate($);

                populateVersusTemplate(currentUser, $, gameInitializationPatch.opponentName);
            }
        }, 500);
    });
})(item => document.querySelector(item));

function clearVersusTemplate($) {
    const $container = $('.container');
    const $header = $('#vs-header');

    $container.removeChild($header);
}

function populateVersusTemplate(currentUser, $, opponentName = '&lt;Waiting for opponent...&gt;') {
    // Grab vs. template
    const $vsTemplate = $('#vs-heading');

    //Grab container
    const $container = $('.container')

    // Grab markup as text from template
    let templateMarkup = $vsTemplate.innerHTML;

    templateMarkup = templateMarkup
        .replace(/{{userName}}/g, currentUser.username)
        .replace(/{{opponentName}}/g, opponentName);

    // Generate a template tag with stuff
    const $node = document.createElement('template');
    $node.innerHTML = templateMarkup;

    $container.appendChild($node.content);
}

function populateLobbyTemplate(currentLobby, $) {
    // Grab lobby template
    const $lobbyTemplate = $('#lobby-heading');

    // Grab container
    const $container = $('.container');

    // Grab markup as text from template
    let templateMarkup = $lobbyTemplate.innerHTML;

    templateMarkup = templateMarkup
        .replace(/{{lobbyName}}/g, currentLobby.lobbyName);

    // Generate a template tag with stuff
    const $node = document.createElement('template');
    $node.innerHTML = templateMarkup;

    $container.appendChild($node.content);
}