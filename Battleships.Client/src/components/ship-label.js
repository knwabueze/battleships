import React from 'react';

const ShipLabel = ({ size, name, selected, onClick, idx }) => (
    <div onClick={() => onClick(idx)} className="Game_list_item Game_list_item--pregame">
        <span className={`Game_list_item_hoverable ${selected && 'Game_bold'}`}>{name}</span> - Size: {size}
    </div>
);

export default ShipLabel;