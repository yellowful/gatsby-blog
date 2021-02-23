import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import TagList from "../components/TagListPage/TagList"
import TagCard from "../components/TagListPage/TagCard"

//根據gatsby-node.js傳來的this.props.pageContext，和graphql抓回來的this.props.data，來自動建立blogs列表和pagination
export default class TagListPage extends React.Component {
    render() {
        let posts = this.props.data.allContentfulAllTag.edges[0].node.blog
        if(posts.length>1){
        posts.sort((postPrev,postNext)=>{
            return new Date(postNext.publishedDate) - new Date(postPrev.publishedDate);
        })}

        const tagSlug=this.props.data.allContentfulAllTag.edges[0].node.slug.toLowerCase();
        const pageURL=`https://bugdetective.netlify.app/blog/tags/${tagSlug.toLowerCase()}/`;

        return (
            <Layout>
                <SEO title="tags" pageURL={pageURL} />
                <TagList tagSlug={tagSlug}>
                    {
                        posts.map((element) => {
                            const {slug,title,publishedDate,iceFireNumber}=element;
                            const {excerpt,timeToRead}=element.articles.childMarkdownRemark;
                            const shortDate = publishedDate.slice(0, 10)
                            return (
                                <React.Fragment>
                                    <TagCard
                                        slug={slug.toLowerCase()}
                                        iceFireNumber={iceFireNumber}
                                        postTitle={title}
                                        publishedDate={shortDate}
                                        excerpt={excerpt}
                                        timeToRead={(timeToRead * 1.5)}
                                        imageSrc={element.images[0].fluid}
                                    />
                                </React.Fragment>
                            )
                        })
                    }
                </TagList>
            </Layout>
        )
    }
}

//如果是單一頁面，不是要gatsby自動產出的，那個頁面的query要用useStaticQuery
//這個檔案是當成template，不是自己要刻的，是要給gatsby-node照樣大量產出的，所以這個頁面的query要用graphql
//gatsby會從node那邊傳$skip和$limit的變數過來，目的是，當目前在做第2頁的時候，可以略過第1頁的資料($skip)，只抓1頁的資料($limit)
//pruneLength是指摘要的字數，truncate是指如果摘要有非英語系的文字，就要設成true，format可以抓html或純文字或markdown

export const tagListQuery = graphql`

  query tagListQuery($slug: String!){
    allContentfulAllTag(filter: {slug: {eq: $slug}}) {
      edges {
        node {
          slug
          tagName
          blog {
            articles {
              childMarkdownRemark {
                excerpt(pruneLength: 150, truncate: true, format: PLAIN)
                timeToRead
              }
            }
            slug
            iceFireNumber
            title
            publishedDate
            images {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  }
`
