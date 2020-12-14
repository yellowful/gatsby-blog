import React from "react"
//import { Link } from "gatsby"
import { graphql,useStaticQuery } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList"
import PostPreview from "../components/PostPreview"
//import BlogTags from "../components/BlogTags/BlogTags"



const Blog = () => {
  const data = useStaticQuery(
    graphql`
    query BlogQuery {
      allContentfulBlog (
        sort: {order: DESC, fields: publishedDate}
      ){
        edges {
          node {
            articles {
              childMarkdownRemark {
                excerpt(pruneLength: 200, truncate: true, format: HTML)
                timeToRead
              }
            }
            slug
            title
            publishedDate
            alltag {
              slug
            }
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
                  postTag={element.node.alltag}
                  timeToRead={element.node.articles.childMarkdownRemark.timeToRead}
                />
              </React.Fragment>
            )
          })
        }
      </PostList>
    </Layout>
  )
}


export default Blog


