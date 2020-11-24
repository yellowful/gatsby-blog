import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

const Hero = () => {
    const data = useStaticQuery(
        graphql`
          query {
            desktop: file(relativePath: { eq: "pexels-markus-spiske-1936299.jpg" }) {
              childImageSharp {
                fluid(quality: 90, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        `
      )
    
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid

    return (
        <div>
            <BackgroundImage
                Tag="section"
                className="cover"
                fluid={imageData}
            />
            
        </div>
    )
}










export default Hero
