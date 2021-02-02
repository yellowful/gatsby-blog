import React from 'react';

const CardList = (props) => {
    return (
        <div className="w-100 mt2 flex flex-column items-center has-background-light">
            <div className="w-100 w-90-m w-80-l mw8 ph3-ns mv2-ns pa2">
                <h2 className="f3 is-dark" >最新文章</h2>
            </div>
            <div className="w-100 w-90-m w-80-l mw8 index-card-container pa3-ns pa2">
                {props.children}
            </div>
        </div>
    )
}

export default CardList;