import { graphql } from 'gatsby';
import React from 'react';
import Layout from "../components/Layout/layout"
import Seo from "../components/Seo/Seo"
import ProjectButtons from "../components/ProjectButtons/ProjectButtons"


//用來作為單篇projec內容的template
export default function ProjectTemplate({ data }) {

    //project introduction是抓回來單篇introduction的內容
    const projectIntroduction = data.contentfulProject.introduction.childMarkdownRemark;
    //project section是抓回來單篇section的內容
    const projectSection = data.contentfulProject.section.childMarkdownRemark;
    //project的名稱、demo的網址、github的網址    
    const { projectName, headOfIntroduction, demoLink, repoLink } = data.contentfulProject;
    //本頁的網址，給seo用的
    const imageURL =
        data.contentfulProject.imagesInMarkdown ?
            `https:${data.contentfulProject.imagesInMarkdown[0].fluid.src}`
            :
            data.site.siteMetadata.image
    const pageURL = `${data.site.siteMetadata.siteUrl}/project/${data.contentfulProject.slug.toLowerCase()}/`
    //第一個section印出本project的主要介紹
    //第二個section印出本project完整的內容
    //table主要是放demo的網址、github的網址、回project頁的網址
    return (
        <Layout>
            <Seo title={projectName} description={projectIntroduction.excerpt} imageURL={imageURL} pageURL={pageURL} />
            <div className="w-100 bg-light-gray">
                <div className="mh3 w-90-m w-80-l mw8 center-ns bg-light-gray">
                    <h1 className="head-1-shadow f2 lh-title fw7 mv3 dark-gray">{projectName}</h1>
                    <div>
                        <h2 className="f3 lh-title tj fw7 mv4 bb b--black-40">{headOfIntroduction}</h2>
                        <section key="project-template-introduction" dangerouslySetInnerHTML={{ __html: projectIntroduction.html }} />
                        <section key="project-template-section" dangerouslySetInnerHTML={{ __html: projectSection.html }} />
                    </div>
                    <hr className="b--dashed bb b--black-40 bw1 mv2" />
                    <ProjectButtons demoLink={demoLink} repoLink={repoLink} />
                </div>
            </div>
        </Layout>
    )
}

//這是用來抓本篇project所有內容
export const projectQuery = graphql`
    query projectSectionByPath($slug: String!){
        contentfulProject(slug: {eq: $slug}) {
            slug
            projectName
            demoLink
            repoLink
            headOfIntroduction
            introduction {
                childMarkdownRemark {
                    html
                    excerpt(format: PLAIN)
                }
            }
            section {
                childMarkdownRemark {
                    html
                    excerpt(format: PLAIN)
                }
            }
            imagesInMarkdown {
                fluid(maxWidth: 1024) {
                    src
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

