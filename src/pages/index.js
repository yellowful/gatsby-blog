import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
import Layout from "../components/Layout/layout"
import Seo from "../components/Seo/seo"
import CardList from "../components/Card/CardList"
import Card from "../components/Card/Card"
import HeroIndex from "../components/Hero/HeroIndex"
import SubscribeContainer from "../components/Subscribe/SubscribeContainer"

//當gatsby跑完之後，整個網站的首頁就是顯示這個資料夾的index.js這個檔的jsx
//這個資料夾的其他.js檔或資料夾，都會變成網站相對網址
const IndexPage = () => {
  //gatsby自動產生的頁面要query就用graphql，如果自己寫的頁面，就用useStaticQuery，這個資料夾裡面的都是用useStaticQuery
  //去”http://localhost:8000/___graphql“查想查的資料後，複製回來用
  //這邊是要查出
  //1. 六篇最新的文章，可以做成card的預覽，放在首頁
  //2. 要給背景用的圖檔
  //3. 要給seo用的截圖
  const data = useStaticQuery(
    graphql`
      query IndexQuery {
        allContentfulBlog(
          limit: 6
          sort: { order: DESC, fields: publishedDate }
        ) {
          edges {
            node {
              articles {
                childMarkdownRemark {
                  excerpt(pruneLength: 80, truncate: true, format: PLAIN)
                  timeToRead
                }
              }
              description {
                childMarkdownRemark {
                  excerpt(pruneLength: 80, truncate: true, format: PLAIN)
                }
              }
              slug
              iceFireNumber
              title
              publishedDate(formatString: "MMMM DD, YYYY")
              images {
                gatsbyImageData(
                  width: 800
                  placeholder: BLURRED
                  aspectRatio: 1.5
                )
              }
            }
          }
        }
        indexCapture: file(relativePath: { eq: "index-capture.jpg" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED)
          }
        }
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )

  // 要給seo用的，讓首頁被分享的時候有截圖
  const imageURLOfSeo =
    data.site.siteMetadata.siteUrl + getSrc(data.indexCapture.childImageSharp)
  const slogan = ["浸泡在各種語言裡抓bug", "游走在各種bug間學語言"]

  //layout每一頁都有，裡面有navbar
  //seo用來處理metadata
  //heroindex用來展示首頁的整頁相片
  //cardlist是用來包住grid的一個外框
  //subscribe是用來包住訂閱和其他連結的component
  return (
    <Layout>
      <Seo
        title="Bug Detective Richard"
        imageURL={imageURLOfSeo}
        description={`${slogan[0]}；${slogan[1]}`}
        pageURL="https://www.bdr.rocks/"
        isArticle={false}
      />
      <HeroIndex slogan={slogan} />
      <CardList>
        {data.allContentfulBlog.edges.map((element, i) => {
          // console.log('index',`index-page-${element.node.slug.toLowerCase()}`)
          return (
            <Card
              key={`index-page-${element.node.slug.toLowerCase()}`}
              node={element.node}
            />
          )
        })}
        
      </CardList>
      <div className="mt2">
        <SubscribeContainer />
      </div>
    </Layout>
  )
}

export default IndexPage
