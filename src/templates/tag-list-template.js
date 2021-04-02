import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import TagList from "../components/TagListPage/TagList"
import TagCard from "../components/TagListPage/TagCard"

//用來自動產生tag列表文章的template
export default class TagListPage extends React.Component {
  render() {
    //本頁所有文章陣列
    let posts = this.props.data.allContentfulAllTag.edges[0].node.blog
    //依照日期新到舊排列
    if (posts.length > 1) {
      posts.sort((postPrev, postNext) => {
        return new Date(postNext.publishedDate) - new Date(postPrev.publishedDate);
      })
    }
    //標籤的slug，要用來排列剩下的標籤用
    const tagSlug = this.props.data.allContentfulAllTag.edges[0].node.slug.toLowerCase();
    //本頁網址，給seo用
    const pageURL = `${this.props.data.site.siteMetadata.siteUrl}/blog/tags/${tagSlug.toLowerCase()}/`;
    //tag list用來顯示所有tag card的外框
    //tag card用來顯示單篇文章的預覽
    return (
      <Layout>
        <SEO title="標籤" pageURL={pageURL} />
        <TagList tagSlug={tagSlug}>
          {
            posts.map((element) => {
              const { slug, title, publishedDate, iceFireNumber } = element;
              const { timeToRead } = element.articles.childMarkdownRemark;
              const description = element.description || element.articles
              const { excerpt } = description.childMarkdownRemark
              return (
                <TagCard
                  slug={slug.toLowerCase()}
                  key={`tag-${slug.toLowerCase()}`}
                  iceFireNumber={iceFireNumber}
                  postTitle={title}
                  publishedDate={publishedDate}
                  excerpt={excerpt}
                  timeToRead={(timeToRead * 1.5)}
                  imageSrc={element.images[0].fluid}
                />
              )
            })
          }
        </TagList>
      </Layout>
    )
  }
}

//graphql才能傳變數
//gatsby會從node那邊傳$slug過來，是個字串，驚嘆號代表必要欄位
//把符合這個tag的文章資料都傳回來
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
            description {
              childMarkdownRemark {
                excerpt(pruneLength: 150, truncate: true, format: PLAIN)
              }
            }
            slug
            iceFireNumber
            title
            publishedDate(formatString: "MMMM DD, YYYY")
            images {
              fluid {
                ...GatsbyContentfulFluid
              }
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
