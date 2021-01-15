import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'

const externalLink = [
    "https://github.com/yellowful/gatsby-blog",
    "https://www.facebook.com/richenyou",
    "https://www.linkedin.com/in/rueichenghuang/",
    "https://github.com/yellowful/gatsby-blog"
]

const icons = [faGithub, faFacebook, faLinkedin, faRss]


const MediaLinks = () => {
    return (

        <div class="h4-l h2 flex justify-around items-center items-end-ns">
            {
                externalLink.map((item, i) => {
                    return (
                        <div class="w-10 tc">
                            <a href={item} rel="noreferrer" target="_blank" className="f3 f2-ns">
                                <FontAwesomeIcon icon={icons[i]} />
                            </a>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default MediaLinks
