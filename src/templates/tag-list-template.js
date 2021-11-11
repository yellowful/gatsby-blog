import React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout/layout"
import Seo from "../components/Seo/seo"
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
        return (
          new Date(postNext.publishedDate) - new Date(postPrev.publishedDate)
        )
      })
    }
    //標籤的slug，要用來排列剩下的標籤用
    const tagSlug = this.props.data.allContentfulAllTag.edges[0].node.slug.toLowerCase()
    const { tagName } = this.props.data.allContentfulAllTag.edges[0].node

    //本頁網址，給seo用
    const pageURL = `${
      this.props.data.site.siteMetadata.siteUrl
    }/blog/tags/${tagSlug.toLowerCase()}/`
    //tag list用來顯示所有tag card的外框
    //tag card用來顯示單篇文章的預覽
    return (
      <Layout>
        <Seo title="標籤" pageURL={pageURL} description={tagSlug} />
        <TagList tagSlug={tagSlug} tagName={tagName}>
          {posts.map(element => {
            const { slug, title, publishedDate, iceFireNumber } = element
            const { timeToRead } = element.articles.childMarkdownRemark
            const description = element.description || element.articles
            const { excerpt } = description.childMarkdownRemark
            const image = getImage(element.images[0])
            // console.log('tag-list-template',`tag-${slug.toLowerCase()}`)
            return (
              <TagCard
                slug={slug.toLowerCase()}
                key={`tag-${slug.toLowerCase()}`}
                iceFireNumber={iceFireNumber}
                postTitle={title}
                publishedDate={publishedDate}
                excerpt={excerpt}
                timeToRead={timeToRead}
                image={image}
              />
            )
          })}
        </TagList>
      </Layout>
    )
  }
}

//graphql才能傳變數
//gatsby會從node那邊傳$slug過來，是個字串，驚嘆號代表必要欄位
//把符合這個tag的文章資料都傳回來
export const tagListQuery = graphql`
  query tagListQuery($slug: String!) {
    allContentfulAllTag(filter: { slug: { eq: $slug } }) {
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
              gatsbyImageData(
                width: 800
                placeholder: BLURRED
                aspectRatio: 1.5
              )
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
