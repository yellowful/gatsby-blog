import React from 'react'
//import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
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
        <span className="pa2 bg-dark-gray w-100 tr">
            <span className="dib v-btm f5 moon-gray font-tc">
                © 2020, Built by &nbsp;
            </span>
            <a href="https://github.com/yellowful/gatsby-blog" rel="noreferrer" target="_blank" className="dib v-btm f5">
                <span className="font-tc">
                Bug Detective Richard &nbsp;
                </span>
                <FontAwesomeIcon icon={faGithub} />
            </a>
        </span>
    )
}

export default Footer
