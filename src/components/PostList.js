import React from 'react'

const PostList = (props) => {
    return (
        <div className="w-100 mt2 flex justify-center">
            <div className="w-100 w-90-ns flex flex-column pa3">
                {props.children}
            </div>
        </div>
    )
}

export default PostList
