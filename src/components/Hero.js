import React from 'react'
import { graphql, useStaticQuery,Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
//import './Hero.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const Hero = () => {
    const data = useStaticQuery(
        graphql`
          query {
            mobileImage: file(relativePath: { eq: "pexels-markus-spiske-1936299.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 1024, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            desktop: file(relativePath: { eq: "pexels-markus-spiske-1936299.jpg" }) {
              childImageSharp {
                fluid(quality: 90, maxWidth: 2048) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `
    )

    // Set ImageData.
    const imageData = [data.mobileImage.childImageSharp.fluid,
    {
        ...data.desktop.childImageSharp.fluid,
        media: `(min-width:60em)`
    }]


    return (
        <div className="w-100 calc-hero-size">
            <BackgroundImage
                Tag={"section"}
                className="hero is-fullheight-with-navbar"
                fluid={imageData}
                backgroundColor={`#000`}
            >
                <div className="w-100 h-100 bg-near-black absolute clip-path-hero flex flex-column justify-center">
                    <div className="columns ma2 ma3-ns">
                        <div className="column">
                            <h1 className="f2-l f3-m f4 light-silver font-tc tc">
                                從寫專利範圍到寫網頁程式
                            </h1>
                            <h1 className="f2-l f3-m f4 light-silver font-tc tc">
                                從抓標號錯誤到抓程式臭蟲
                            </h1>
                        </div>
                        <div className="column flex flex-column justify-end">
                            <Link
                                to="/about"
                                className="ma2 f3-l f4-m f5 font-tc  tr tr-m tc-l"
                            >關於我<FontAwesomeIcon icon={faAngleDoubleRight} /></Link>
                        </div>
                    </div>
                </div>
            </BackgroundImage>
        </div>
    )
}










export default Hero
