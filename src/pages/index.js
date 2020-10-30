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
        data.allMarkdownRemark.edges.map((element) => {
        return(
          <React.Fragment>
            <li>
              <Link to={element.node.frontmatter.slug}>{element.node.frontmatter.slug}</Link>          
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
        allMarkdownRemark (
          sort: {order:ASC,fields:[frontmatter___date]}
          limit: 10
          filter:{frontmatter:{published:{eq:true}}}
        ){
          edges {
            node {
              frontmatter {
                slug
                title
                published
              }
              id
            }
          }
        }
    }
`

export default IndexPage
