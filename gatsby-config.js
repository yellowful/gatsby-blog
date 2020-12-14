const { Children } = require("react")

//set contentful api key
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `蟲探理查`,
    description: `從寫專利範圍到寫網頁程式，從抓標號錯誤到抓程式臭蟲`,
    author: `Bug Detective Richard`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-reading-time`, 
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 1024,
              backgroundColor:'transparent'
            },
          },         
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                "heading[depth=1]": "font-tc f3 f3-ns lh-title fw7 mv3 dark-gray", 
                "heading[depth=2]": "font-tc f4 f3-ns lh-title fw7 mv3 dark-gray", 
                "heading[depth=3]": "font-tc f5 underline f4-ns lh-title fw6 mv3 dark-gray", 
                "heading[depth=4]": "font-tc f5 f4-ns lh-title fw5 mv3 dark-gray", 
                "paragraph": "font-tc f5 f4-ns lh-copy mv1 mv2-ns fw3",
                "list":"ml2 ml3-ns mv1 mv2-ns",
                "listItem":"font-tc f5 f4-ns lh-copy mv2 fw3",
                "listItem + paragraph": "font-tc f5 f4-ns lh-copy mv2 fw3",
                "listItem listItem": "anchor-word-breaker",
                "thematicBreak":"w-40 bb bw1 b--black-10 center mv3",
                "link":"anchor-word-breaker"
              }
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
         
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
        ]
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true
      }
    },
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
          endpoint: process.env.GATSBY_MAILCHIMP_ENDPOINT, // string; add your MC list endpoint here; see instructions below
          timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
  ],
}
