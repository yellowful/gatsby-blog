import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

const Hero = () => {
    const data = useStaticQuery(
        graphql`
          query {
            mobileImage: file(relativePath: { eq: "pexels-markus-spiske-1936299.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 1024, quality: 100) {
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
            media:`(min-width:60em)`
        }]


    return (
        <div className="w-100 vh-100">
            <BackgroundImage
                Tag={"section"}
                className={"hero vh-100"}
                fluid={imageData}
                backgroundColor={`#040e18`}
            >
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title has-text-light">
                            Hero title
                        </h1>
                        <h2 class="subtitle has-text-light">
                            Hero subtitle
                        </h2>
                    </div>
                </div>
            </BackgroundImage>
        </div>
    )
}










export default Hero
