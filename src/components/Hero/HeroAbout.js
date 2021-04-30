import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from 'gatsby-background-image'

//用來顯示about page最上面的hero
const HeroAbout = ({ slug, head, content }) => {
  const data = useStaticQuery(
    graphql`
      query {
        mobileImage: file(relativePath: { eq: "personal-photo-round.png" }) {
            childImageSharp {
              gatsbyImageData(
                layout: FIXED
                width:150
                height: 150
              )
            }
        }
        tabletImage: file(relativePath: { eq: "personal-photo-round.png" }) {
            childImageSharp {
              gatsbyImageData(
                layout: FIXED
                width:250
                height: 250
              )
            }
        }
        desktop: file(relativePath: { eq: "personal-photo-round.png" }) {
          childImageSharp {
              gatsbyImageData(
                layout: FIXED
                width:360
                height: 360
              )
          }
        }
      }
    `
  )
  //用來將圖檔分成三種螢幕尺寸的大小
  const imageData = [
    data.mobileImage.childImageSharp.gatsbyImageData,
    {
      ...data.tabletImage.childImageSharp.gatsbyImageData,
      media: `(min-width: 30em) and (max-width: 60em)`
    },
    {
      ...data.desktop.childImageSharp.gatsbyImageData,
      media: `(min-width:60em)`
    }
  ]

  const bgImage = convertToBgImage(imageData)
  console.log('bgImage',bgImage);
  
  return (
    <section className="hero bg-moon-gray">
      <div className="w-80 w-70-m w-60-l mw7 center pb3">
        <h1 id={slug} className="tc head-1-shadow f3 f2-ns lh-title fw7 mv4 dark-gray">{head}</h1>
        <BackgroundImage
          Tag={"div"}
          className="image-hero-about"
          {...bgImage}
          backgroundColor="transparent"
        />
        <section dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  )
}


export default HeroAbout
