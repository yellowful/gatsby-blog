import React from "react"
import { graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/Layout/layout"
import Seo from "../components/Seo/seo"
import PostList from "../components/PostPreview/PostList"
import PostPreview from "../components/PostPreview/PostPreview"

//根據gatsby-node.js傳來的this.props.pageContext，和graphql抓回來的this.props.data，來自動建立blogs列表和pagination
export default class BlogList extends React.Component {
  render() {
    //currentPage是現在在建立這一頁的數字；numPages是所有的頁面數
    const { currentPage, numPages } = this.props.pageContext

    //如果目前頁面是第一頁，isFirst就是true
    const isFirst = currentPage === 1

    //如果目前頁面數字剛好就是總頁面數，isLast就是false
    const isLast = currentPage === numPages

    //如果目前是第2頁，prevPage的slug就是"/blog""，如果不是第2頁，prevPage就是前一頁的網址
    const prevPage =
      currentPage - 1 === 1
        ? `/blog-list/`
        : `/blog-list/page-${(currentPage - 1).toString()}/`

    //nextPage就是下一頁的slug
    const nextPage = `/blog-list/page-${(currentPage + 1).toString()}/`

    //傳給seo的網址中，假如是第一頁，就讓blog-list當slug，其他的就用page-number當slug
    const seoPage = isFirst
      ? `${this.props.data.site.siteMetadata.siteUrl}/blog-list/`
      : `${
          this.props.data.site.siteMetadata.siteUrl
        }/blog-list/page-${currentPage.toString()}/`

    //post list是用來放所有post preview的框框
    return (
      <Layout>
        <Seo title="文章" pageURL={seoPage} />
        <PostList>
          {this.props.data.allContentfulBlog.edges.map(element => {
            const {
              slug,
              iceFireNumber,
              title,
              publishedDate,
              articles,
              tag,
            } = element.node
            // console.log('blog-list-template',`blog-${slug.toLowerCase()}`)
            return (
              <PostPreview
                slug={slug.toLowerCase()}
                key={`blog-${slug.toLowerCase()}`}
                iceFireNumber={iceFireNumber}
                postTitle={title}
                publishedDate={publishedDate}
                excerpt={articles.childMarkdownRemark.excerpt}
                postTag={tag}
                timeToRead={
                  articles.childMarkdownRemark.timeToRead 
                }
              />
            )
          })}
        </PostList>
        <div className="w-100 flex justify-center bg-light-gray pv3">
          {
            //假如現在是第1頁，就不用顯示前一頁的按鈕，如果不是第1頁，就顯示
            isFirst ? null : (
              <span key="pagination-number-prev" className="mh2 mh3-ns">
                <Link to={prevPage} rel="prev">
                  <FontAwesomeIcon icon={faStepBackward} />
                </Link>
              </span>
            )
          }

          {
            //產生一個總頁數數目的array，裡面每一個元素都是undefined，_就是裡面的元素。
            //要連的網址，當i是0的時候，代表第1頁，就連去/blog/，其他就連去第i+1頁的slug。
            Array.from({ length: numPages }, (_, i) => (
              <span key={`pagination-number-${i + 1}/`} className="mh2 mh3-ns">
                <Link
                  to={
                    i === 0
                      ? `/blog-list/`
                      : `/blog-list/page-${(i + 1).toString()}/`
                  }
                  activeClassName="orange underline o-80"
                >
                  {i + 1}
                </Link>
              </span>
            ))
          }

          {
            //假如現在是最後一頁，就不用顯示下一頁的按鈕，如果不是最後一頁，就顯示
            isLast ? null : (
              <span key="pagination-number-next" className="mh2 mh3-ns">
                <Link to={nextPage} rel="next">
                  <FontAwesomeIcon icon={faStepForward} />
                </Link>
              </span>
            )
          }
        </div>
      </Layout>
    )
  }
}

//如果是單一頁面，不是要gatsby自動產出的，那個頁面的query要用useStaticQuery
//這個檔案是當成template，不是自己要刻的，是要給gatsby-node照樣大量產出的，所以這個頁面的query要用graphql
//gatsby會從node那邊傳$skip和$limit的變數過來，目的是，當目前在做第2頁的時候，可以略過第1頁的資料($skip)，只抓1頁的資料($limit)
//pruneLength是指摘要的字數，truncate是指如果摘要有非英語系的文字，就要設成true，format可以抓html或純文字或markdown
export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allContentfulBlog(
      sort: { order: DESC, fields: publishedDate }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          articles {
            childMarkdownRemark {
              excerpt(pruneLength: 250, truncate: true, format: HTML)
              timeToRead
            }
          }
          slug
          iceFireNumber
          title
          publishedDate(formatString: "MMMM DD, YYYY")
          tag {
            slug
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
