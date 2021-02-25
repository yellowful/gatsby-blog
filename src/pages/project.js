import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import ProjectList from "../components/ProjectPage/ProjectList"
import ProjectCard from "../components/ProjectPage/ProjectCard"


const Blog = () => {

  const data = useStaticQuery(
    graphql`
      query projectQuery {
        allContentfulProject(sort: {fields: serial, order: ASC}) {
          edges {
            node {
              serial
              slug
              projectName
              demoLink
              repoLink
              introduction {
                childMarkdownRemark {
                  html
                }
              }
              section {
                childMarkdownRemark {
                  html
                }
              }
              publishedDate
              images {
                  file {
                    url
                  }
              }
            }
          }
        }
        site {
          siteMetadata {
            canonicalUrl
          }
        }
      }
    `
  )

  const post=data.allContentfulProject.edges
  const pageUrl=data.site.siteMetadata.canonicalUrl+'/project/'

  return(
    <Layout>
      <SEO title="作品" pageURL={pageUrl} />
      <ProjectList>
        {
          post.map((item,i)=>{
            return(
              <ProjectCard 
                slug={item.node.slug.toLowerCase()}
                key={`project-${item.node.slug.toLowerCase()}`} 
                projectName={item.node.projectName}
                demoLink={item.node.demoLink}
                repoLink={item.node.repoLink}
                introduction={item.node.introduction.childMarkdownRemark.html} 
                section={item.node.section.childMarkdownRemark.html}
                image={`https:${item.node.images[0].file.url}`}
              />
            )
          })
        }
      </ProjectList>
    </Layout>
  )
} 

export default Blog
