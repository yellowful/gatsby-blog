import React from 'react'
import RestOfTags from "../RestOfTags/RestOfTags"


const TagList = (props) => {
    return (
        <div className="w-100 flex justify-center bg-light-gray">
            <div className="w-100 w-90-m w-80-l mw8 flex flex-column ph3 pa3-ns">
                <header className="w-100 flex justify-between items-center">
                    <RestOfTags tagSlug={props.tagSlug} />
                </header>
                        {props.children}
            </div>
        </div>
    )
}

export default TagList
