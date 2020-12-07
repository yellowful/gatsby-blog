import React from "react"
//import { Link } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList"
import PostPreview from "../components/PostPreview"


const Blog = ({data}) => {

  return (
    <Layout>
      <SEO title="文章" />
      <PostList>
        {
          data.allContentfulBlog.edges.map((element) => {
            const publishedDate = element.node.publishedDate.slice(0, 10)
            return (
              <React.Fragment>
                <PostPreview 
                  key={`blog${element.node.slug}`}
                  slug={element.node.slug}
                  postTitle={element.node.title}
                  publishedDate={publishedDate}
                  excerpt={element.node.articles.childMarkdownRemark.excerpt}
                />
              </React.Fragment>
            )
          })
        }
      </PostList>
    </Layout>
  )
}


export const pageQuery = graphql`
    query BlogQuery {
      allContentfulBlog (
        sort: {order: DESC, fields: publishedDate}
      ){
        edges {
          node {
            articles {
              childMarkdownRemark {
                excerpt(pruneLength: 200, truncate: true, format: HTML)
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




export default Blog


