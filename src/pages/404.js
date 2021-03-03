import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from 'gatsby-background-image'
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"

const NotFoundPage = () => {

  const data = useStaticQuery(
    graphql`
      query fourZeroFourQuery {
        mobileImage: file(relativePath: { eq: "404image.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
        }
        desktop: file(relativePath: { eq: "404image.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 2048) {
                ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )

  const imageData = [data.mobileImage.childImageSharp.fluid,
  {
    ...data.desktop.childImageSharp.fluid,
    media: `(min-width:60em)`
  }]

  return (
    <Layout>
      <SEO title="404: Not found" />
      <BackgroundImage
                Tag={"section"}
                className="hero is-fullheight-with-navbar"
                fluid={imageData}
                backgroundColor={`#000`}
      >
      <div className="w-100 h-100 absolute clip-path-404">
      <div className="w-90 w-80-m w-70-l vh-75 mw8 center  flex flex-column justify-center items-center">
        <p className="mt4 f3 f2-ns fw7 dark-gray">
          404: 找不到網頁
        </p>
        <p className="f4 f3-ns fw5 dark-gray">
          404: Not Found
        </p>
        <p className="f5 f3-ns fw3 dark-gray mt3 w-60 center">
          您剛剛點了一個不存在網頁的網址，請點其他網址或回上一頁
        </p>
        </div>
      </div>
      </BackgroundImage>
    </Layout>
  )
}

export default NotFoundPage
