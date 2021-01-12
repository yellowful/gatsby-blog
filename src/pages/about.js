import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import EmailForm from "../components/EmailForm/EmailForm"
import HeroAbout from "../components/Hero/HeroAbout"
import ClickExpand from "../components/ClickExpand/ClickExpand"
import ClippedEdge from "../components/ClippedEdge/ClippedEdge"
import SkillList from "../components/SkillList/SkillList"


const About = () => {
  const data = useStaticQuery(
    graphql`
      query aboutBlogQuery {
        allContentfulAbout(sort: {fields: serial, order: ASC}) {
          edges {
            node {
              slug
              serial
              title
              childContentfulAboutContentTextNode {
                childMarkdownRemark {
                  html
                  excerpt(format: HTML, truncate: true, pruneLength: 150)
                }
              }
              complexData {
                category
                items
              }
            }
          }
        }
      }
    `
  )


  const aboutBlog = data.allContentfulAbout.edges[0].node;
  const aboutAuthor = data.allContentfulAbout.edges[1].node;
  const aboutSkill = data.allContentfulAbout.edges[2].node;


  return (
    <Layout>
      <SEO title="關於作者" />
      <div className="flex flex-column">
        <HeroAbout head={aboutBlog.title} content={aboutBlog.childContentfulAboutContentTextNode.childMarkdownRemark.html} />
        <ClippedEdge topBackground={"bg-moon-gray"} edgeHeight={"4em"} edgeMarginTop={"1em"} edgeMarginBottom={"2em"} />
        <ClickExpand data={aboutAuthor} bgColor={"bg-near-white"} />
        <ClippedEdge topBackground={"bg-near-white"} edgeHeight={"4em"} edgeMarginTop={"1em"} edgeMarginBottom={"2em"} />
        <SkillList data={aboutSkill} bgColor={"bg-moon-gray"} />
        <ClippedEdge topBackground={"bg-moon-gray"} edgeHeight={"4em"} edgeMarginTop={"1em"} edgeMarginBottom={"2em"} />
        <EmailForm />
      </div>
    </Layout >
  )
}

export default About
