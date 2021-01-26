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
              childContentfulProjectIntroductionTextNode {
                childMarkdownRemark {
                  html
                }
              }
              childContentfulProjectSectionTextNode {
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
      }
    `
  )

  const post=data.allContentfulProject.edges

  return(
    <Layout>
      <SEO title="project" />
      <ProjectList>
        {
          post.map((item,i)=>{
            return(
              <ProjectCard 
                slug={item.node.slug}
                projectName={item.node.projectName}
                demoLink={item.node.demoLink}
                repoLink={item.node.repoLink}
                introduction={item.node.childContentfulProjectIntroductionTextNode.childMarkdownRemark.html} 
                section={item.node.childContentfulProjectSectionTextNode.childMarkdownRemark.html}
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
