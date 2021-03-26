import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

//顯示單篇文章裡面的所有tags
const PostTags = ({ tag }) => {
    return (
        <aside className="w-100">
            <span key="main-tag" className="f4 dib v-mid mr2"><FontAwesomeIcon icon={faTags} /></span>
            {
                tag.map((item, i) => {
                    return (
                        <span key={`blog-tags-${item.slug.toLowerCase()}`}>
                            <Link to={`/blog/tags/${item.slug.toLowerCase()}/`} className="dib v-mid br-pill pv1 ph3 bg-moon-gray mh2">
                                    {item.slug}
                            </Link>
                        </span>
                    )
                })
            }
        </aside>
    )
}



export default PostTags
