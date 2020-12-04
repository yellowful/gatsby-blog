import React from 'react';
import Img from 'gatsby-image'
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const Card = ({ slug, postTitle, publishedDate, imageSrc, excerpt }) => {
    return (
        <article className="br2 dark-gray b--black-10 bg-light-gray">
            <Img className="db w-100 br2 br--top" fluid={{ ...imageSrc, aspectRatio: 1.5 }} />
            <div className="pa2 ph3-ns pb3-ns">
                <div className="dt w-100 mt1">
                    <div className="dtc">
                        <h1 className="f5 f4-ns mv0">{postTitle}</h1>
                    </div>
                    <div className="dtc tr">
                        <h2 className="f5 mv0">{publishedDate}</h2>
                    </div>
                </div>
                <p className="f6 lh-copy measure mt2 mid-gray">
                    {excerpt}
                </p>
                <p className="pointer tr"><Link to={`/blog/${slug}`}>更多<FontAwesomeIcon icon={faAngleDoubleRight} /></Link></p>
            </div>
        </article>
    )
}

export default Card;