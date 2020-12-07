import React from 'react';
import { Link } from "gatsby"
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const PostPreview = ({ slug, postTitle, publishedDate, imageSrc, excerpt }) => {
    return (
        <article className="pv4 bt bb b--black-10 ph3 ph0-l">
        <div className="flex flex-column flex-row-ns">
          <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
            <h1 className="font-tc f2 f1-ns lh-title fw8 mv2">{postTitle}</h1>
            {/* <p className="f5 f4-l lh-copy athelas">
            {excerpt}
            </p> */}
            <div dangerouslySetInnerHTML={{ __html: excerpt }} />
          </div>
          <div className="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
          <Img className="db w-100 br2 br--top" fluid={{ ...imageSrc, aspectRatio: 1.5 }} />
          </div>
        </div>
        <p className="font-tc  f6 lh-copy gray mv0">By <span className="near-black">BugDetectiveRichard</span></p>
        <time className="f6 db gray">{publishedDate}</time>
        <p className="pointer tr"><Link to={`/blog/${slug}`}>更多<FontAwesomeIcon icon={faAngleDoubleRight} /></Link></p>
      </article>
    )
}

export default PostPreview;