import React from 'react';
import Img from 'gatsby-image'
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import TimeToRead from '../TimeToRead/TimeToRead';

const Card = ({ node }) => {
    const { title, publishedDate, iceFireNumber } = node;
    const { excerpt, timeToRead } = node.articles.childMarkdownRemark
    const slug = node.slug.toLowerCase()

    return (
        <article className="br2 dark-gray b--black-10 bg-light-gray">
            <Link to={`/blog/${slug}/`}>
                {
                    node.images ?
                        <Img className="db w-100 br2 br--top" fluid={{ ...node.images[0].fluid, aspectRatio: 1.5 }} />
                        :
                        <h2 className="tc mv4 gray">沒有圖片</h2>
                }
            </Link>
            <div className="pa2 ph3-ns pb3-ns">
                <div className="dt w-100">
                    <header className="w-100">
                        <Link to={`/blog/${slug}/`}>
                            <h3 className="f5 f4-ns mv0">{title}</h3>
                        </Link>
                    </header>
                    {/* <div className="w-100 tr">
                        <time className="f6 mv0">{publishedDate}</time>
                    </div> */}
                    <TimeToRead publishedDate={publishedDate} timeToRead={timeToRead} iceFireNumber={iceFireNumber} />
                </div>
                <section className="f6 lh-copy measure mt2 mid-gray">
                    {excerpt}
                </section>
                <footer className="pointer tr">
                    <Link to={`/blog/${slug}/`}>
                        更多<FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Link>
                </footer>
            </div>
        </article>
    )
}

export default Card;