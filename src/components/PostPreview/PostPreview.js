import React from 'react';
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'
import TimeToRead from './TimeToRead';
//import { Like, CommentsCount } from 'react-facebook';

const PostPreview = ({ slug, postTitle, publishedDate, excerpt, postTag, timeToRead }) => {
    //console.log(`https://bugdetective.netlify.app/blog/${slug}`);
    return (
        <article className="pv2 pv4-ns bb b--black-10 flex flex-column">
            <div className="w-100 pr3-ns">
                <Link to={`/blog/${slug}/`}>
                    <h1 className="head-1-shadow f2 lh-title fw7 mv4 dark-gray">{postTitle}</h1>
                </Link>
                <TimeToRead publishedDate={publishedDate} timeToRead={timeToRead} />
                <section className="excerpt-gradient ph1-ns pl2">
                    <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                </section>
            </div>
            <footer class="w-100 tr">
                    <Link to={`/blog/${slug}/`} className="pointer f4 fw3 pr3-ns">
                        繼續閱讀<FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Link>
            </footer>
        </article>
    )
}

export default PostPreview;