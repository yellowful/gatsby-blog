import React from 'react'
import {Link} from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'

const externalLink = [
    "https://github.com/yellowful/gatsby-blog",
    "https://www.facebook.com/richenyou",
    "https://www.linkedin.com/in/rueichenghuang/"
]

const icons = [faGithub, faFacebook, faLinkedin]


const MediaLinks = () => {
    return (

        <div className="h4-l h2 flex justify-around items-end-ns">
            {
                externalLink.map((item, i) => {
                    return (
                        <div key={item.slice(-7)} className="w-10 tc">
                            <a href={item} rel="noreferrer" target="_blank" className="f3 f2-ns">
                                <FontAwesomeIcon icon={icons[i]} />
                            </a>
                        </div>
                    )
                })
            }
            <div className="w-10 tc">
                <Link to={`/rss.xml`} className="f3 f2-ns">
                    <FontAwesomeIcon icon={faRss} />
                </Link>
            </div>
        </div>

    )
}

export default MediaLinks
