/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
import GoogleSchema from "./GoogleSchema"

//每個有route的網頁都要放這個component
//最重要的是title標題、description摘要、pageUrl網址、imageUrl代表圖，這要給facebook轉載時預覽
//isArticle是用來判斷是不是部落格的文章，部落格最需要增加搜尋的排名，所以詳細資料要傳進去。
function Seo({ description, lang, meta, title, datePublished, imageURL, pageURL, isArticle }) {
  const { site,siteLogo } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            image
          }
        }
        siteLogo: file(relativePath: { eq: "bdr.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED)
          }
        }
      }
    `
  )
  
  //網站的代表圖網址
  const fixedSrc = site.siteMetadata.siteUrl + getSrc(siteLogo.childImageSharp);
  //當沒有摘要時，就用網站說明當摘要
  const metaDescription = description || site.siteMetadata.description
  //當沒有代表圖的時候，就用網站代表圖當代表圖
  const metaImage = imageURL || fixedSrc
  //網站的標題
  const defaultTitle = site.siteMetadata?.title
  //沒有傳網址進來時，就用網站的網址當網址
  const metaURL = pageURL || site.siteMetadata.siteUrl

  console.table({
    siteUrl:site.siteMetadata.siteUrl,
    getSrc:getSrc(siteLogo.childImageSharp),
    imageURL:imageURL
  });
  
  //article類型的網頁會把資料傳給GoogleSchema，以利google搜尋
  return (
    <React.Fragment>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        //如果defaultTitle是true的話，Helmet內部的function會把title放進%s的地方
        titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
        meta={[
          {
            name:"google-site-verification",
            content:"KJpG1EM3MTDmNeDPJoYyxlUO6c6fodNnr-Vzytotr34",
          },
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:image`,
            content: metaImage,
          },
          {
            property: `fb:app_id`,
            content: `129888612117049`,
          },
          {
            property: `og:url`,
            content: metaURL,
          }
        ].concat(meta)}
      >
      </Helmet>
      {
        //Helmet不能包住Helmet，但是可以平行的放置
        //如果是blog的文章，多以下給fb的資料
        isArticle ?
          (
            <Helmet>
              <meta property="og:type" content="article" />
              <meta property="og:article:published_time" content={datePublished} />
              <meta property="article:author" content="https://www.bdr.rocks" />
            </Helmet>
          )
          :
          <Helmet>
            <meta property="og:type" content="website" />
          </Helmet>
        }
      <GoogleSchema isArticle={isArticle} title={title} pageURL={pageURL} imageURL={imageURL} datePublished={datePublished} siteUrl={site.siteMetadata.siteUrl}/>
    </React.Fragment>
  )
}

//定義初始值
Seo.defaultProps = {
  lang: `zh-Hant-TW`,
  meta: [],
  description: ``,
  datePublished: ``,
  imageURL: ``,
}

//定義type
Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  datePublished: PropTypes.string,
  imageURL: PropTypes.string,
}

export default Seo
