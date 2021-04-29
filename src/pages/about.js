import React, { useState,useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { navigate } from '@reach/router';
import Layout from "../components/Layout/layout"
import Seo from "../components/seo/seo"
import EmailForm from "../components/EmailForm/EmailForm"
import HeroAbout from "../components/Hero/HeroAbout"
import AboutAuthor from "../components/AboutAuthor/AboutAuthor"
import ClippedEdge from "../components/ClippedEdge/ClippedEdge"
import SkillList from "../components/SkillList/SkillList"
import SubscribeContainer from "../components/Subscribe/SubscribeContainer"

//放關於我、關於網站、聯絡資訊的component
const About = ({location}) => {
  //把contentful上放的關於我的內容抓下來用
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
  //用來控制作者是不是要打開
  const [isAuthorExpanded, setAuthorState] = useState(false);
  //用來控制技能說明是不是要打開
  const [isSkillsExpanded, setSkillsState] = useState(false);
  //帶來這裡的網址裡是不是有hash tag，如果有，就放進變數hash裡面
  const {hash} = location;
  //用來判斷是不是有hash，如果有hash就到hash的地方去
  //replace:true是把最後一個browse history移除，如此瀏覽器的回到上一頁才能發生功能
  useEffect(() =>{
    if(hash){
      navigate(hash,{replace:true});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  //用來讓關於作者展開
  const onAuthorExpanding = (ev) => {
    ev.preventDefault();
    setAuthorState(true);
  }
  //用來讓關於作者收合
  const onAuthorFolding = (ev) => {
    ev.preventDefault();
    setAuthorState(false);
  }
  //用來讓技能展開
  const onSkillsExpanding = (ev) => {
    ev.preventDefault();
    setSkillsState(true);
  }
  //用來讓技能收合
  const onSkillsFolding = (ev) => {
    ev.preventDefault();
    setSkillsState(false);
  }
  //設定抓回來的三段的內容
  const aboutBlog = data.allContentfulAbout.edges[0].node;
  const aboutAuthor = data.allContentfulAbout.edges[1].node;
  const aboutSkill = data.allContentfulAbout.edges[2].node;

  //hero about是用來顯示關於網站的內容
  //clipped edge是用來讓每一段之間可以有曲線的分隔
  //about author是用來放「關於我」的內容
  //skill list是用來放技能的內容
  //email form是用來放可以寄信給我的欄位
  //subscribe container使用來放訂閱文章和其他連結
  return (
    <Layout>
      <Seo 
        title="關於" 
        description={aboutBlog.content.childMarkdownRemark.excerpt} 
        pageURL="https://www.bdr.rocks/about/"
        isArticle={false}
      />
      <div className="flex flex-column">
        <HeroAbout slug={aboutBlog.slug} head={aboutBlog.title} content={aboutBlog.content.childMarkdownRemark.html} />
        <ClippedEdge key="clipped-edge-site" topBackground={"bg-moon-gray"} edgeHeight={"4em"} edgeMarginTop={"1em"} edgeMarginBottom={"2em"} />
        <AboutAuthor data={aboutAuthor} bgColor={"bg-near-white"} isExpanded={isAuthorExpanded} slug={aboutAuthor.slug} />
        <ClippedEdge key="clipped-edge-author"
          topBackground={"bg-near-white"}
          edgeHeight={"4em"}
          edgeMarginTop={"1em"}
          edgeMarginBottom={"2em"}
          isExpanded={isAuthorExpanded}
          onExpanding={onAuthorExpanding}
          onFolding={onAuthorFolding}
        />
        <SkillList slug={aboutSkill.slug} data={aboutSkill} bgColor={"bg-moon-gray"} isExpanded={isSkillsExpanded} />
        <ClippedEdge key="clipped-edge-skill-list"
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
