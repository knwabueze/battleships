import React from 'react';

const GameBoardCell = ({ onHover, onHoverEnd, onClick, metadata, ...rest }) => (
    <td {...rest}
        className={metadata.classes.join(' ')}
        onMouseOver={onHover}
        onMouseOut={onHoverEnd}
        onClick={onClick} />
);

export default GameBoardCell;