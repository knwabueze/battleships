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
            const gameInitializationPatch = await Ajax.pollLobby(currentLobby.lobbyId, currentUser.id);

            if (gameInitializationPatch.statusCode === 0) {
                window.clearInterval(stopInterval);
                console.log(gameInitializationPatch);

                clearVersusTemplate($);

                populateVersusTemplate(currentUser, $, gameInitializationPatch.opponentName);

                init(currentUser, gameInitializationPatch, $);
            }
        }, 500);
    });
})(item => document.querySelector(item));

function init(currentUser, gameInitializationPatch, $) {
    // First initialize both boards
    // Then allow players to place ships
    // Then first person gets to shoot while the other polls for updates
    // Allow user to post a placeshot because server-side validation will be kept

    // Select container dom element
    const $container = $('#container');

    // Instantiate board objects
    const yourBoard = new BattleshipsInstance.Board();
    const theirBoard = new BattleshipsInstance.Board();

    // Select board-view template
    const $boardView = $('#board-view');
    const templateMarkup = $boardView.innerHTML;

    // Generate html <template> to contain board-view dom element
    const $boardViewTemplate = document.createElement('template');
    $boardViewTemplate.innerHTML = templateMarkup;

    // Inject opponents name into their dom view
    const $opponentSubtitle = $boardViewTemplate.content.querySelector('[data-inject-opponent-name]');
    $opponentSubtitle.textContent = `${gameInitializationPatch.opponentName}'s board`;

    // Populate each respective players' boards
    const $yourBoard = $boardViewTemplate.content.querySelector('#your-board');
    const $theirBoard = $boardViewTemplate.content.querySelector('#opponent-board');

    populateBoard($yourBoard);
    populateBoard($theirBoard);

    // Mount board view template
    $container.appendChild($boardViewTemplate.content);
}

function populateBoard($el) {
    for (let y = 0; y < 10; y++) {
        const $currentBoardRow = document.createElement('tr');

        for (let x = 0; x < 10; x++) {
            const $currentBoardCell = document.createElement('td');
            $currentBoardCell.dataset.x = x + 1;
            $currentBoardCell.dataset.y = y + 1;

            $currentBoardRow.appendChild($currentBoardCell);
        }

        $el.appendChild($currentBoardRow);
    }
}

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