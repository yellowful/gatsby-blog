import React from 'react'
//是blog page裡，用來放所有預覽文章的框框
const PostList = (props) => {
    return (
        <section className="w-100 flex justify-center bg-light-gray">
            <div className="w-100 w-90-m w-80-l mw8 flex flex-column ph3 pa3-ns">
                {props.children}
            </div>
        </section>
    )
}

export default PostList
