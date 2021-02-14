import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import CardList from "../components/Card/CardList"
import Card from "../components/Card/Card"
import HeroIndex from "../components/Hero/HeroIndex"
import SubscribeContainer from "../components/Subscribe/SubscribeContainer"



//當gatsby跑完之後，整個網站的首頁就是顯示這個資料夾的index.js這個檔的jsx
//這個資料夾的其他.js檔或資料夾，都會變成網站相對網址
const IndexPage = () => {
  //gatsby自動產生的頁面要query就用graphql，如果自己寫的頁面，就用useStaticQuery，這個資料夾裡面的都是用useStaticQuery
  //去”http://localhost:8000/___graphql“查想查的資料後，複製回來用
  //這邊是要查出六篇最新的文章，可以做成card的預覽，放在首頁  
  const data = useStaticQuery(
    graphql `
    query IndexQuery {
      allContentfulBlog (
        limit:6
        sort: {order: DESC, fields: publishedDate}
      ){
        edges {
          node {
            articles {
              childMarkdownRemark {
                excerpt(pruneLength: 80,truncate: true)
              }
            }
            slug
            title
            publishedDate
            images {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
    `
  )
  
  return(
    <Layout>
      <SEO title="首頁" />
      <HeroIndex />
      <CardList>
        {
          data.allContentfulBlog.edges.map((element,i) => {
            const publishedDate = element.node.publishedDate.slice(0, 10)
            return(
              <React.Fragment key={`index-${element.node.slug.toLowerCase()}`}>
                  <Card 
                    slug={element.node.slug.toLowerCase()}
                    postTitle={element.node.title}
                    publishedDate={publishedDate}
                    excerpt={element.node.articles.childMarkdownRemark.excerpt}
                    imageSrc={element.node.images[0].fluid}
                  />
              </React.Fragment>
            )
          })
        }
      </CardList>
      <div className="mt2">
        <SubscribeContainer />
      </div>
    </Layout>
  )
}

export default IndexPage
