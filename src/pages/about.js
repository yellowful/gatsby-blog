import React, { useState,useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { navigate } from '@reach/router';
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import EmailForm from "../components/EmailForm/EmailForm"
import HeroAbout from "../components/Hero/HeroAbout"
import AboutAuthor from "../components/AboutAuthor/AboutAuthor"
import ClippedEdge from "../components/ClippedEdge/ClippedEdge"
import SkillList from "../components/SkillList/SkillList"
import SubscribeContainer from "../components/Subscribe/SubscribeContainer"


const About = ({location}) => {
  const data = useStaticQuery(
    graphql`
      query aboutBlogQuery {
        allContentfulAbout(sort: {fields: serial, order: ASC}) {
          edges {
            node {
              slug
              serial
              title
              content{
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
  
  const [isAuthorExpanded, setAuthorState] = useState(false);
  const [isSkillsExpanded, setSkillsState] = useState(false);
  const {hash} = location;

  useEffect(() =>{
    if(hash){
      navigate(hash,{replace:true});
    }
  },[])

  const onAuthorExpanding = (ev) => {
    ev.preventDefault();
    setAuthorState(true);
  }

  const onAuthorFolding = (ev) => {
    ev.preventDefault();
    setAuthorState(false);
  }

  const onSkillsExpanding = (ev) => {
    ev.preventDefault();
    setSkillsState(true);
  }
  const onSkillsFolding = (ev) => {
    ev.preventDefault();
    setSkillsState(false);
  }

  const aboutBlog = data.allContentfulAbout.edges[0].node;
  const aboutAuthor = data.allContentfulAbout.edges[1].node;
  const aboutSkill = data.allContentfulAbout.edges[2].node;


  return (
    <Layout>
      <SEO 
        title="關於" 
        description={aboutBlog.content.childMarkdownRemark.excerpt} 
        pageURL="https://www.bdr.rocks/"
        isArticle={false}
      />
      <div className="flex flex-column">
        <HeroAbout slug={aboutBlog.slug} head={aboutBlog.title} content={aboutBlog.content.childMarkdownRemark.html} />
        <ClippedEdge topBackground={"bg-moon-gray"} edgeHeight={"4em"} edgeMarginTop={"1em"} edgeMarginBottom={"2em"} />
        <AboutAuthor data={aboutAuthor} bgColor={"bg-near-white"} isExpanded={isAuthorExpanded} slug={aboutAuthor.slug} />
        <ClippedEdge
          topBackground={"bg-near-white"}
          edgeHeight={"4em"}
          edgeMarginTop={"1em"}
          edgeMarginBottom={"2em"}
          isExpanded={isAuthorExpanded}
          onExpanding={onAuthorExpanding}
          onFolding={onAuthorFolding}
        />
        <SkillList slug={aboutSkill.slug} data={aboutSkill} bgColor={"bg-moon-gray"} isExpanded={isSkillsExpanded} />
        <ClippedEdge
          topBackground={"bg-moon-gray"}
          edgeHeight={"4em"}
          edgeMarginTop={"1em"}
          edgeMarginBottom={"2em"}
          isExpanded={isSkillsExpanded}
          onExpanding={onSkillsExpanding}
          onFolding={onSkillsFolding}
        />
        <EmailForm />
        <SubscribeContainer />
      </div>
    </Layout >
  )
}

export default About
