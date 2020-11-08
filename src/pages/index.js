import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <ul>
      {
        data.allContentfulBlog.edges.map((element) => {
        return(
          <React.Fragment>
            <li>
              <Link to={element.node.slug}>{element.node.slug}</Link>          
            </li>
          </React.Fragment>
        )   
        })
      } 
    </ul>
  </Layout>
)

export const pageQuery = graphql `
    query IndexQuery {
      allContentfulBlog {
        edges {
          node {
            slug
            subTag
            mainTag
            title
            createdAt
            publishedDate
            updatedAt
          }
        }
      }  
    }
`

export default IndexPage
