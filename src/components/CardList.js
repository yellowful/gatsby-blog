import React from 'react';

const CardList = (props) => {
    return(
        <div className="w-100 mt2 flex justify-center has-background-light">
        <h3 className="pv2 is-dark" >最新文章</h3>
            <div className="w-100 w-90-ns index-card-container pa3">
                {props.children}
            </div>
        </div>
    )
}

export default CardList;