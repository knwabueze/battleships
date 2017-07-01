/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
    }

    lobbyTable.addEventListener('click', function (e) {
        if (e.target && e.target.nodeName === 'TD') {
            const $parent = e.target.parentElement;

            const { id: userId } = currentUser;

            const val = {
                lobbyId: $parent.dataset.id,
                createdAt: $parent.dataset.createdAt,
                lobbyName: $parent.dataset.lobbyName,
                hostUsername: $parent.dataset.hostName
            }

            joinLobby({ lobbyId: val.lobbyId, userId }, function (item) {
                if (item === 0) {
                    sessionStorage.setItem("currentLobby", JSON.stringify(val));
                    window.location.href = '/game';
                }
            });
        }
    });
}

async function joinLobby({ lobbyId, userId }, callback) {

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userId)
    };

    const response = await window.fetch(`${domainName}/api/lobbies/join/${lobbyId}`, options);
    const data = await response.json();

    callback(data);
}

/***/ })

/******/ });