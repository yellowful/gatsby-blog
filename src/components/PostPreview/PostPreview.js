import React from 'react';
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'
import TimeToRead from './TimeToRead';
//import { Like, CommentsCount } from 'react-facebook';

const PostPreview = ({ slug, postTitle, publishedDate, excerpt, postTag, timeToRead }) => {
    //console.log(`https://bugdetective.netlify.app/blog/${slug}`);
    return (
        <div className="pv2 pv4-ns bb b--black-10 flex flex-column">
            <div className="w-100 pr3-ns">
                <Link to={`/blog/${slug}`}>
                    <h1 className="font-tc head-1-shadow f2 lh-title fw7 mv4 dark-gray">{postTitle}</h1>
                </Link>
                <TimeToRead publishedDate={publishedDate} timeToRead={timeToRead} />
                <div className="excerpt-gradient ph1-ns pl2">
                    <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                </div>
            </div>
            <div class="w-100 tr">
                    <Link to={`/blog/${slug}`} className="pointer font-tc f4 fw3 pr3-ns">
                        繼續閱讀<FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Link>
            </div>
            {/* <div class="w-100 flex flex-column flex-row-ns">
                <div class="w-100 w-50-ns order-1 order-0-ns mv2">
                    <table>
                        <tbody>
                            <tr>
                                <Link to={`/blog/${slug}`} className="pointer">
                                    <td className="f4 pr1 w2"><FontAwesomeIcon icon={faComments} /></td>
                                    <td className="pr2 w2 mw2 f4"><CommentsCount href={`https://bugdetective.netlify.app/blog/${slug}`} lazy="true" /></td>
                                    <td className="mw6"><Like href={`https://bugdetective.netlify.app/blog/${slug}`} colorScheme="light" showFaces lazy="true" size="large" width="90" button_count /></td>
                                </Link>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="w-100 w-50-ns order-0 order-1-ns tr pr2">
                    <Link to={`/blog/${slug}`} className="pointer font-tc f5 f4-ns">
                        繼續閱讀<FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Link>
                </div>
            </div> */}
        </div>
    )
}

export default PostPreview;