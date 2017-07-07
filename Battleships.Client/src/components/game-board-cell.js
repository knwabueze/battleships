import React from 'react';

const GameBoardCell = ({ onHover, onHoverEnd, onClick, metadata, ...rest }) => (
    <td {...rest}
        className={metadata.classes.join(' ')}
        onMouseEnter={onHover}
        onMouseLeave={onHoverEnd}
        onClick={onClick} />
);

export default GameBoardCell;