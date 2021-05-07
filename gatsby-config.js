//const { Children } = require("react")

//用來設定各種api key
//用gatsby develope的時候，process.env.NODE_ENV就是develope
//用gatsby build的時候，process.env.NODE_ENV就是production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  flags: { PRESERVE_WEBPACK_CACHE: true },
  siteMetadata: {
    title: `蟲探理查`,
    description: `從寫專利範圍到寫網頁程式，從抓標號錯誤到抓程式臭蟲`,
    author: `黃瑞成`,
    image:`/icons/icon-512x512.png`,
    siteUrl:`https://www.bdr.rocks`
  },
  plugins: [
    //產生sitemap，列表頁、標籤頁、搜尋頁都不需要放上去
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        exclude: [`/blog-list/*`,`/blog/tags/*`, `/blog/style-number/*`],
      }
    },
    //用來做google分析的plugin
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-4T61R4H6E8", // Google Analytics / GA
        ],
        gtagConfig: {
          anonymize_ip: true
        },
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
        },
      },
    },
    //用來寫html metadata用的plugin，主要和seo相關
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-remove-serviceworker',
    //檔案系統載入graphql用的，這裡主要是可以搜尋圖檔用
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    //這三個都是gatsby用來處理相片的plugin
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    //這個是gatsby offline在用的plugin
    //icon主要是用來顯示在標題列的圖案
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `蟲探理查`,
        short_name: `蟲探理查`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    //要處理svg的話要用這個plugin
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/src/images/svg` // See below to configure properly
        }
      }
    },
    //用來處理markdown的plug in
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          //用來讓markdown可以嵌入codepen的plug in
          {
            resolve:"@weknow/gatsby-remark-codepen",
            options: {
              theme: "dark",
              height: 400
            }
          },
          //用來讓markdown的程式碼的部份，產生複製程式碼的按鈕
          {
            resolve: 'gatsby-remark-code-buttons',
            options: {
              toasterText: '程式碼已複製',
              // Optional toaster duration. Defaults to 3500.
              toasterDuration: 1000
            }
          },
          //讓markdown可以用來嵌入gist，gist是用來引用project一小部份程式碼，並產生連結的服務
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              // Optional:
    
              // the github handler whose gists are to be accessed
              username: "yellowful",
    
              // a flag indicating whether the github default gist css should be included or not
              // default: true
              // DEPRECATED (PLEASE USE gistDefaultCssInclude)
              includeDefaultCss: true || false,
    
              // a flag indicating whether the github default gist css should be included or not
              // default: true
              gistDefaultCssInclude: true || false,
    
              // a flag indicating whether the github default gist css should be preloaded or not
              // use this if you want to load the default css asynchronously.
              // default: false
              gistCssPreload: true || false,
    
              // a string that represents the github default gist css url.
              // defaults: "https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css"
            }
          },
          `gatsby-remark-containers`,
          //預估閱讀時間
          `gatsby-remark-reading-time`,
          //用來放youtube的
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                //embedURL那行，可以讓影片不會出現推薦影片之類的畫面
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                }
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: 'embedVideo-container', //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
            }
          },
          //也是給youtube用的，讓youtube比較responsive
          "gatsby-remark-responsive-iframe",
          //markdown裡面如果有external links的話，讓他們加上以下選項，較為安全
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener nofollow"
            }
          },
          //用來style markdown的內容
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                "heading[depth=1]": "f3 lh-title tj fw7 mv4 dark-gray bb b--black-40",
                "heading[depth=2]": "f3 lh-title tj fw7 mv4 bb b--black-40",
                "heading[depth=3]": "f4 lh-title tc fw7 mv4 dark-gray",
                "heading[depth=4]": "f4 lh-title tj fw5 mv4 black underline",
                "paragraph": "f4 lh-copy tj mv4 fw3",
                "list[ordered=true]": "ml4 f4 lh-copy tj mv4 fw3",
                "listItem": "f4 lh-copy tj mv3 fw3",
                "listItem > paragraph": "paragraph-in-item",
                "listItem listItem": "anchor-word-breaker",
                "list[ordered=false]": "ml4 f4 lh-copy tj mv4 fw3 ul-circle",
                "thematicBreak": "w-40 bb bw1 b--black-10 center mv5",
                "link": "anchor-word-breaker",
                "table":"table is-bordered o-80",
              }
            }
          },
          //markdown裡面，用來處理contentful的圖片，就不用把contenful的圖片抓回server，圖片直接外聯contentful
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 1024,
              backgroundColor: 'transparent',
              showCaptions:true
            },
          },
          //用來產生程式碼區域的plug in，要搭配gatsby-browser裡面的theme來用
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
    //用來把contentful內容轉成graphql
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true
      }
    },
    //icon
    `gatsby-plugin-fontawesome-css`,
    //電子報、news letter服務
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.GATSBY_MAILCHIMP_ENDPOINT, // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    //搜尋，matchFields指的是slug有變的話，才更新index
    //queries裡面是一個陣列，裡面包了一堆objects
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
        matchFields: ['slug']
      },
    },
    //用來產生rss的plug in
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                author
                siteUrl
                description
                image
                title
              }
            }
          }
        `,
        //serialize裡面放的是一堆objects，每一個objects代表一篇文章
        //output、title...等等，是這個rss的基本資料
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlog } }) => {
              return allContentfulBlog.edges.map(edge => {
                return Object.assign({}, {
                  title:edge.node.title,
                  description: edge.node.articles.excerpt,
                  date: edge.node.publishedDate,
                  url: site.siteMetadata.sitelUrl + "/blog/" + edge.node.slug.toLowerCase()+"/",
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
                          excerpt(format: PLAIN, pruneLength: 50, truncate: true)
                        }
                      }
                      publishedDate(formatString: "MMMM DD, YYYY")
                      slug
                      title
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "蟲探理查",
            site_url:"https://www.bdr.rocks",
            image_url:"https://www.bdr.rocks/icons/icon-512x512.png"
          },
        ],
      },
    },
  ],
}
