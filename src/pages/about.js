import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import EmailForm from "../components/EmailForm/EmailForm"
import HeroAbout from "../components/Hero/HeroAbout"

const About = () => {
  const data = useStaticQuery(
    graphql`
      query AboutQuery {
        allContentfulAbout{
          edges {
            node {
              slug
              title
              childContentfulAboutContentTextNode {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    `
  )

  const aboutBlog=data.allContentfulAbout.edges[1].node;
  const aboutAuthor=data.allContentfulAbout.edges[0].node;

  return (
    <Layout>
      <SEO title="關於作者" />
      <div className="flex flex-column">
        <HeroAbout head={aboutBlog.title} content={aboutBlog.childContentfulAboutContentTextNode.childMarkdownRemark.html} />
        <div className="w-100 clip-path-about-gradient">
        <div className="w-100 clip-path-about-author" />
        <div className="w-100 w-90-m w-80-l ph3 mw8 center">
            <h1 className="tc font-tc head-1-shadow f3 f2-ns lh-title fw7 mv4 dark-gray">{aboutAuthor.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: aboutAuthor.childContentfulAboutContentTextNode.childMarkdownRemark.html }} />
          <EmailForm />
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
