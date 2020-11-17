import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CardList from "../components/CardList"
import Card from "../components/Card"

const IndexPage = ({data}) => {
  return(
    <Layout>
      <SEO title="Home" />
      <CardList>
        {
          data.allContentfulBlog.edges.map((element) => {
            const publishedDate = element.node.publishedDate.slice(0, 10)
            return(
              <React.Fragment>
                  <Card slug={element.node.slug} 
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
    </Layout>
  )
}

export const pageQuery = graphql `
    query IndexQuery {
      allContentfulBlog {
        edges {
          node {
            articles {
              childMarkdownRemark {
                excerpt(pruneLength: 80,truncate: true)
              }
            }
            slug
            subTag
            title
            publishedDate
            mainTag
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

export default IndexPage
