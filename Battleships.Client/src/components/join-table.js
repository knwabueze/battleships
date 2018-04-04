import React from 'react';

import JoinTableRow from './join-table-row';

const JoinTable = ({ lobbies, onRowClicked }) => (
    <table className="Join_table">
        <thead>
            <tr>
                <th>Lobby Name</th>
                <th>Host</th>
                <th>Created At</th>                
            </tr>
        </thead>
        <tbody>
            {lobbies.map(lobby => <JoinTableRow
                onClick={onRowClicked}
                key={lobby.lobbyId}
                name={lobby.lobbyName}
                host={lobby.hostUsername}
                createdAt={lobby.createdAt}
                id={lobby.lobbyId} />)}
        </tbody>
    </table>
)

export default JoinTable;