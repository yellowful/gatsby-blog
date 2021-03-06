import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"
import Layout from "../components/Layout/layout"
import Seo from "../components/Seo/seo"
import GoBack from "../components/GoBack/GoBack"

//用來放404的頁面
const NotFoundPage = () => {
  //用來抓404背景圖
  const data = useStaticQuery(
    graphql`
      query fourZeroFourQuery {
        fourZeroFourImage: file(relativePath: { eq: "404image.jpg" }) {
          childImageSharp {
            gatsbyImageData(transformOptions: { fit: COVER, cropFocus: CENTER })
          }
        }
      }
    `
  )

  //抓到的背景圖，分成手機和桌面，存成array，供傳給background image component來用
  const imageData = data.fourZeroFourImage.childImageSharp.gatsbyImageData
  const bgImage = convertToBgImage(imageData)

  //背景圖包住內容和一個回上一頁的按鈕
  return (
    <Layout>
      <Seo title="404: Not found" />
      <BackgroundImage
        Tag={"section"}
        className="hero is-fullheight-with-navbar"
        {...bgImage}
        backgroundColor={`#000`}
      >
        <div className="w-100 h-100 absolute clip-path-404">
          <div className="w-90 w-80-m w-70-l vh-75 mw8 center  flex flex-column justify-center items-center">
            <p key="not-fount-mandarin" className="mt5 f3 f2-ns fw7 dark-gray">
              404: 找不到網頁
            </p>
            <p key="not-fount-english" className="f4 f3-ns fw5 dark-gray">
              404: Not Found
            </p>
            <p
              key="not-fount-instruction"
              className="f5 f3-ns fw3 dark-gray mt3 w-60 center"
            >
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
