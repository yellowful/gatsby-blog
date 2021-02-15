import { graphql,Link } from 'gatsby';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"

//Template名稱不影響，因為gatsby內部會自己產生component，和這個名稱無關
//這給function主要要回傳單一post，這個post原本是contentful上的markdown，
//被gatsby根據gatsby-config.js的設定，轉換成style好的html，然後這邊graphql再去抓回來，放在props.data裡
//所以gatsby-node.js就會根據這個Template的function所return的jsx，去弄出每一頁
export default function ProjectTemplate({ data }) {

    //post就是根據下面$slug去graphql抓下來這一頁的內容
    const projectIntroduction = data.contentfulProject.introduction.childMarkdownRemark;
    const projectSection = data.contentfulProject.section.childMarkdownRemark;

    //contentful上這篇文章有設定文章title
    //contentful上這篇文章有設定文章的公開時間
    const { projectName, demoLink, repoLink } = data.contentfulProject;

    const pageURL = `${data.site.siteMetadata.canonicalUrl}/project/${data.contentfulProject.slug.toLowerCase()}/`

    return (
        <Layout>
            <SEO title={projectName} description="introductions of my web projects" pageURL={pageURL} />
            <div className="w-100 bg-light-gray">
                <div className="mh3 w-90-m w-80-l mw8 center-ns bg-light-gray">
                    <h1 className="head-1-shadow f2 lh-title fw7 mv3 dark-gray">{projectName}</h1>
                    <div>
                        <h2 className="f3 lh-title fw7 mv4 dark-gray">作品特點</h2>
                        <section dangerouslySetInnerHTML={{ __html: projectIntroduction.html }} />
                        <section dangerouslySetInnerHTML={{ __html: projectSection.html }} />
                    </div>
                    <hr className="b--dashed bb b--black-40 bw1 mv4" />
                    <table className="w-100 tc mb4 f4 lh-copy fw3">
                        <tr>
                            <td>
                                <a href={demoLink} rel="noreferrer" target="_blank">試玩 &nbsp;<FontAwesomeIcon icon={faGamepad} /></a>
                            </td>
                            <td><a href={repoLink} rel="noreferrer" target="_blank">原始碼 &nbsp;<FontAwesomeIcon icon={faGithub} /></a></td>
                            <td>
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

//如果是單一頁面，不是要gatsby自動產出的，那個頁面的query要用useStaticQuery
//這個檔案是當成template，不是自己要刻的，是要給gatsby-node照樣大量產出的，所以這個頁面的query要用graphql
//gatsby會讓$slug從node.js傳過來，query可以在”http://localhost:8000/___graphql“找自己想query的東西，再拷貝過來
//BlogPostByPath是自己取的，其實不會用到

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
            canonicalUrl
          }
        }
    }
`

