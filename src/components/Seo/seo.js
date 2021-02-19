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
import GoogleSchema from "./GoogleSchema"

function SEO({ description, lang, meta, title, datePublished, imageURL, pageURL, isArticle }) {
  const { site,siteLogo } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            canonicalUrl
            image
          }
        }
        siteLogo: file(relativePath: { eq: "bdr.png" }) {
          childImageSharp {
            fixed(width: 1024) {
              src
            }
          }
        }
      }
    `
  )

  const fixedSrc = site.siteMetadata.canonicalUrl + siteLogo.childImageSharp.fixed.src
  //console.table({imageURL:imageURL,fixedSrc:fixedSrc,pageURL:pageURL});
  const metaDescription = description || site.siteMetadata.description
  const metaImage = imageURL || fixedSrc
  const defaultTitle = site.siteMetadata?.title
  const metaURL = pageURL || site.siteMetadata.canonicalUrl
  //console.table({description:description, lang:lang, meta:meta, title:title, datePublished:datePublished, imageURL:imageURL, pageURL:pageURL, isArticle:isArticle});

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
        isArticle ?
          (
            <Helmet>
              <meta property="og:type" content="article" />
              <meta property="og:article:published_time" content={datePublished} />
              <meta property="article:author" content="https://bugdetective.netlify.app/about/" />
            </Helmet>
          )
          :
          <Helmet>
            <meta property="og:type" content="website" />
          </Helmet>
        }
      <GoogleSchema isArticle={isArticle} title={title} pageURL={pageURL} imageURL={imageURL} datePublished={datePublished} />
    </React.Fragment>
  )
}

//定義初始值
SEO.defaultProps = {
  lang: `zh-Hant-TW`,
  meta: [],
  description: ``,
  datePublished: ``,
  imageURL: ``,
}

//定義type
SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  datePublished: PropTypes.string,
  imageURL: PropTypes.string,
}

export default SEO
