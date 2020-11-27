import React from 'react';
import Img from 'gatsby-image'
import { Link } from "gatsby"

const Card = ({ slug, postTitle, publishedDate, imageSrc, excerpt }) => {
    return (
        <article class="br2 ba dark-gray b--black-10 bg-light-gray mv4 h-50 w-100 w-50-m w-25-l mw5 center">
            <Img className="db w-100 br2 br--top" fluid={{ ...imageSrc, aspectRatio: 1.5 }} />
            <div class="pa2 ph3-ns pb3-ns">
                <div class="dt w-100 mt1">
                    <div class="dtc">
                        <h1 class="f5 f4-ns mv0">{postTitle}</h1>
                    </div>
                    <div class="dtc tr">
                        <h2 class="f5 mv0">{publishedDate}</h2>
                    </div>
                </div>
                <p class="f6 lh-copy measure mt2 mid-gray">
                    {excerpt}
                </p>
                <p className="pointer"><Link to={`/blog/${slug}`}>更多</Link></p>
            </div>
        </article>
    )
}

export default Card;