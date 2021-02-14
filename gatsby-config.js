const { Children } = require("react")

//set contentful api key
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  flags: {
    DEV_SSR: false
  },
  siteMetadata: {
    title: `蟲探理查`,
    description: `從寫專利範圍到寫網頁程式，從抓標號錯誤到抓程式臭蟲`,
    author: `黃瑞成`,
    image:`src/images/bdrlogo.svg`,
    canonicalUrl:`https://bugdetective.netlify.app`
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
        icon: `src/images/favicon669.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/src/images/svg` // See below to configure properly
        }
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-containers`,
          `gatsby-remark-reading-time`,
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                }
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: 'embedVideo-container', //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
            }
          },
          "gatsby-remark-responsive-iframe",
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener nofollow"
            }
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                "heading[depth=1]": "f3 underline lh-title fw7 mv4 dark-gray",
                "heading[depth=2]": "f3 lh-title fw7 mv4 dark-gray",
                "heading[depth=3]": "f4 underline lh-title fw5 mv4 dark-gray",
                "heading[depth=4]": "f4 lh-title fw5 mv4 dark-gray",
                "paragraph": "f4 lh-copy mv4 fw3",
                "list[ordered=true]": "ml4 f4 lh-copy mv4 fw3",
                "listItem": "f4 lh-copy mv3 fw3",
                "listItem > paragraph": "paragraph-in-item",
                "listItem listItem": "anchor-word-breaker",
                "list[ordered=false]": "ml4 f4 lh-copy mv4 fw3 ul-circle",
                "thematicBreak": "w-40 bb bw1 b--black-10 center mv5",
                "link": "anchor-word-breaker",
                "table":"table is-bordered o-80",
              }
            }
          },
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 1024,
              backgroundColor: 'transparent',
              showCaptions:true
            },
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
          }
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
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries")
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                author
                canonicalUrl
                description
                image
                title
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlog } }) => {
              return allContentfulBlog.edges.map(edge => {
                return Object.assign({}, {
                  title:edge.node.title,
                  description: edge.node.articles.excerpt,
                  date: edge.node.publishedDate,
                  url: site.siteMetadata.canonicalUrl + "/blog/" + edge.node.slug,
                  guid: edge.node.id,
                  custom_elements: [{ "content:encoded": edge.node.articles.childMarkdownRemark.html }],
                })
              })
            },
            query: `
              {
                allContentfulBlog(sort: {order: DESC, fields: publishedDate}) {
                  edges {
                    node {
                      articles {
                        childMarkdownRemark {
                          html
                          excerpt(format: PLAIN, pruneLength: 150, truncate: true)
                        }
                      }
                      publishedDate
                      slug
                      title
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "蟲探理查的RSS Feed訂閱",
          },
        ],
      },
    },
  ],
}
