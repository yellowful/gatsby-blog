import React from 'react';

const CardList = (props) => {
    return(
        <div className="w-100 vh-100 mt1 mt2-ns flex justify-center has-background-light">
            <div className="w-100 w-90-m w-80-l flex flex-wrap justify-center">
                {props.children}
            </div>
        </div>
    )
}

export default CardList;