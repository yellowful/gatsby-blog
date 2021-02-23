import React from 'react'
import Img from 'gatsby-image'
import TimeToRead from '../PostPreview/TimeToRead'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'



const TagCard = ({ slug, postTitle, publishedDate, excerpt, imageSrc, timeToRead,iceFireNumber }) => {
    return (
        <>
            <article className="pt3 pb2 bt bb b--black-10 ph1 ph0-l" key={`tag-${slug}`}>
                <div className="flex flex-column flex-row-ns">
                    <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
                        <Link to={`/blog/${slug}/`}>
                            <h1 className="f3 fw7 athelas mt0 lh-title head-1-shadow dark-gray">{postTitle}</h1>
                        </Link>
                        <section className="f5 f4-l lh-copy">
                            <span>
                                {excerpt}
                            </span>
                        </section>
                        <footer className="f5 f4-l lh-copy tr">
                            <Link to={`/blog/${slug}/`}>
                                繼續閱讀
                                <FontAwesomeIcon icon={faAngleDoubleRight} />
                            </Link>
                        </footer>
                    </div>
                    <div className="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
                        <Link to={`/blog/${slug}/`}>
                            <Img className="db" fluid={{ ...imageSrc, aspectRatio: 1.5 }} />
                        </Link>
                    </div>
                </div>
                <TimeToRead iceFireNumber={iceFireNumber} publishedDate={publishedDate} timeToRead={Math.round(timeToRead * 1.5)} />
            </article>
        </>
    )
}

export default TagCard
