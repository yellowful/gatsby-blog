import React from 'react';

const CardList = (props) => {
    return(
        <div className="flex flex-wrap">
            {props.children}
        </div>
    )
}

export default CardList;