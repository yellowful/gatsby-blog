import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import Seo from "../components/seo/seo"
import ProjectList from "../components/ProjectPage/ProjectList"
import ProjectCard from "../components/ProjectPage/ProjectCard"

//放projects的頁面
const ProjectPage = () => {

  //主要query放在contentful上關於project的內容
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
            siteUrl
          }
        }
      }
    `
  )
  
  //post是所有project內容構成的陣列
  const post=data.allContentfulProject.edges
  //project這個網頁的網址
  const pageUrl=data.site.siteMetadata.siteUrl+'/project/'
  //ProjectCard是用來放project card外框的地方
  //抓回來的project內容放在project card裡面
  return(
    <Layout>
      <Seo title="作品" pageURL={pageUrl} />
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

export default ProjectPage
