import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from 'gatsby-background-image'
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import GoBack from "../components/GoBack/GoBack"

//用來放404的頁面
const NotFoundPage = () => {
  //用來抓404背景圖
  const data = useStaticQuery(
    graphql`
      query fourZeroFourQuery {
        mobileImage: file(relativePath: { eq: "404image.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 85) {
                ...GatsbyImageSharpFluid
              }
            }
        }
        desktop: file(relativePath: { eq: "404image.jpg" }) {
          childImageSharp {
            fluid(quality: 85, maxWidth: 2048) {
                ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )
  
  //抓到的背景圖，分成手機和桌面，存成array，供傳給background image component來用
  const imageData = [data.mobileImage.childImageSharp.fluid,
  {
    ...data.desktop.childImageSharp.fluid,
    media: `(min-width:60em)`
  }]

  //背景圖包住內容和一個回上一頁的按鈕
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
            <p className="mt5 f3 f2-ns fw7 dark-gray">
              404: 找不到網頁
        </p>
            <p className="f4 f3-ns fw5 dark-gray">
              404: Not Found
        </p>
            <p className="f5 f3-ns fw3 dark-gray mt3 w-60 center">
              您剛剛點了一個不存在網頁的網址，請點其他網址
        </p>
            <div className="w-90 w-70-l">
              <GoBack />
            </div>
          </div>
        </div>
      </BackgroundImage>
    </Layout>
  )
}

export default NotFoundPage
