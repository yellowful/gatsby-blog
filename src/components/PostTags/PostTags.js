import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

const PostTags = ({ tag }) => {
    return (
        <div className="w-100">
            <span className="f4 dib v-mid mr2"><FontAwesomeIcon icon={faTags} /></span>
            {
                tag.map((item, i) => {
                    return (
                        <span key={`blog-tags-${item.slug}`}>
                            <Link to={`/blog/tags/${item.slug}`} className="dib v-mid br-pill pv1 ph3 bg-moon-gray mh2">
                                    {item.slug}
                            </Link>
                        </span>
                    )
                })
            }
        </div>
    )
}



export default PostTags
