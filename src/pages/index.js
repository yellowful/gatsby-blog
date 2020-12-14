import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CardList from "../components/CardList"
import Card from "../components/Card"
import Hero from "../components/Hero"
import Subscribe from "../components/Subscribe"

const IndexPage = () => {
  
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
      <SEO title="Home" />
      <Hero />
      <CardList>
        {
          data.allContentfulBlog.edges.map((element) => {
            const publishedDate = element.node.publishedDate.slice(0, 10)
            return(
              <React.Fragment>
                  <Card 
                    key={`index${element.node.slug}`}
                    slug={element.node.slug}
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
        <Subscribe />
      </div>
    </Layout>
  )
}

export default IndexPage
