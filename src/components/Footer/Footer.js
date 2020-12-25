import React from 'react'
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'

//import Img from "gatsby-image"

const Footer = () => {
    // const data = useStaticQuery(graphql`
    //     query {
    //         githubLogo: file(relativePath: { eq: "GitHub-Mark-120px-plus.png" }) {
    //             childImageSharp {
    //                 fluid(maxWidth: 96, quality: 100) {
    //                     ...GatsbyImageSharpFluid
    //                 }
    //             }
    //         }
    //     }
    // `)

    return (
        <div className="has-background-dark w-100 flex justify-center">
            <span className="pv2 bg-dark-gray w-100 w-90-m w-70-l mw8 tr">
                <span className="dib v-btm moon-gray font-tc f7 f6-ns">
                    © 2020, Built by &nbsp;
            </span>
                <a href="https://github.com/yellowful/gatsby-blog" rel="noreferrer" target="_blank" className="dib v-btm font-tc f7 f6-ns mr4-ns">
                    <FontAwesomeIcon icon={faGithub} />
                    <span className="font-tc">
                        Bug Detective Richard &nbsp;
                </span>
                </a>
                <Link to="/privacy-policy/PrivacyPolicy" className="dib v-btm font-tc f7 f6-ns">
                    <FontAwesomeIcon icon={faUserLock} />
                    <span className="font-tc">
                        隱私權保護政策 &nbsp;
                </span>
                </Link>
            </span>
        </div>
    )
}

export default Footer
