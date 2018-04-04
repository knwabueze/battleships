import React from 'react';

const JoinTableRow = ({ name, host, createdAt, id, onClick }) =>
    <tr onClick={onClick}
        data-id={id}
        data-lobby-name={name}
        data-host-name={host}
        data-created-at={createdAt}>
        <td>{name}</td>
        <td>{host}</td>
        <td>{createdAt}</td>
    </tr>;

export default JoinTableRow;