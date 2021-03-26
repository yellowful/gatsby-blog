import { graphql,Link } from 'gatsby';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"

//用來作為單篇projec內容的template
export default function ProjectTemplate({ data }) {

    //project introduction是抓回來單篇introduction的內容
    const projectIntroduction = data.contentfulProject.introduction.childMarkdownRemark;
    //project section是抓回來單篇section的內容
    const projectSection = data.contentfulProject.section.childMarkdownRemark;
    //project的名稱、demo的網址、github的網址    
    const { projectName, demoLink, repoLink } = data.contentfulProject;
    //本頁的網址，給seo用的
    const pageURL = `${data.site.siteMetadata.siteUrl}/project/${data.contentfulProject.slug.toLowerCase()}/`
    //第一個section印出本project的主要介紹
    //第二個section印出本project完整的內容
    //table主要是放demo的網址、github的網址、回project頁的網址
    return (
        <Layout>
            <SEO title={projectName} description="introductions of my web projects" pageURL={pageURL} />
            <div className="w-100 bg-light-gray">
                <div className="mh3 w-90-m w-80-l mw8 center-ns bg-light-gray">
                    <h1 className="head-1-shadow f2 lh-title fw7 mv3 dark-gray">{projectName}</h1>
                    <div>
                        <h2 className="f3 lh-title fw7 mv4 dark-gray">作品特點</h2>
                        <section key="project-template-introduction" dangerouslySetInnerHTML={{ __html: projectIntroduction.html }} />
                        <section key="project-template-section" dangerouslySetInnerHTML={{ __html: projectSection.html }} />
                    </div>
                    <hr className="b--dashed bb b--black-40 bw1 mv4" />
                    <table className="w-100 tc mb4 f4 lh-copy fw3">
                        <tr>
                            <td key={`project-template-${demoLink}`}>
                                <a href={demoLink} rel="noreferrer" target="_blank">試玩 &nbsp;<FontAwesomeIcon icon={faGamepad} /></a>
                            </td>
                            <td key={`project-template-${repoLink}`}><a href={repoLink} rel="noreferrer" target="_blank">原始碼 &nbsp;<FontAwesomeIcon icon={faGithub} /></a></td>
                            <td key={`project-template-/project/`}>
                                <Link to="/project/">
                                    回作品集列表 &nbsp;<FontAwesomeIcon icon={faAngleDoubleLeft} />
                                </Link>
                            </td>
                        </tr>
                    </table>
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
            images {
                file {
                url
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

