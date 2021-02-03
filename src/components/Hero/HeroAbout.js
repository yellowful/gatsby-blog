import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
//import Img from "gatsby-image"
import BackgroundImage from 'gatsby-background-image'
//import BackgroundImage from 'gatsby-background-image'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const HeroAbout = ({ head, content }) => {
    const data = useStaticQuery(
        graphql`
          query {
            mobileImage: file(relativePath: { eq: "personal-photo-round.png" }) {
                childImageSharp {
                  fixed(width:150, height: 150) {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
            tabletImage: file(relativePath: { eq: "personal-photo-round.png" }) {
                childImageSharp {
                    fixed(width:250, height: 250) {
                    ...GatsbyImageSharpFixed
                    }
                }
            }
            desktop: file(relativePath: { eq: "personal-photo-round.png" }) {
              childImageSharp {
                fixed(width:360, height: 360) {
                    ...GatsbyImageSharpFixed
                }
              }
            }
          }
        `
    )

    const imageData = [data.mobileImage.childImageSharp.fixed,
    {
        ...data.tabletImage.childImageSharp.fixed,
        media: `(min-width: 30em) and (max-width: 60em)`
    },
    {
        ...data.desktop.childImageSharp.fixed,
        media: `(min-width:60em)`
    }
    ]


    return (
        <section className="hero bg-moon-gray">
                <div className="w-80 w-70-m w-60-l mw7 center pb3">
                    <h1 className="tc head-1-shadow f3 f2-ns lh-title fw7 mv4 dark-gray">{head}</h1>
                    <BackgroundImage
                        Tag={"div"}
                        className="image-hero-about"
                        fixed={imageData}
                        backgroundColor="transparent"
                    />
                    <section dangerouslySetInnerHTML={{ __html: content }} />
                </div>
        </section>
    )
}


export default HeroAbout
