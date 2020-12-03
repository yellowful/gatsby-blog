import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const Footer = () => {
    const data = useStaticQuery(graphql`
        query {
            githubLogo: file(relativePath: { eq: "GitHub-Mark-120px-plus.png" }) {
                childImageSharp {
                    fluid(maxWidth: 96, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `)

    return (
        <span className="pa2 bg-dark-gray w-100 tr">
            <span className="dib v-btm f5 moon-gray font-tc">
                © 2020, Built by &nbsp;
            </span>
            <Link to="https://github.com/yellowful/gatsby-blog" className="dib v-btm f5 font-tc">
                Bug Detective Richard
            </Link>
            <Link to="https://github.com/yellowful/gatsby-blog" className="dib v-btm">
                <Img className="h2 w2 dib v-mid mh2" alt="github logo" fluid={data.githubLogo.childImageSharp.fluid} />
            </Link>
        </span>
    )
}

export default Footer
