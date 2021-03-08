import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import MeterCard from "../components/Meter/MeterCard"
import MeterList from "../components/Meter/MeterList"
import MeterSlider from "../components/Meter/MeterSlider"

//用來自動產生10個有風格指數的頁面
//每一頁篩選了那個特定指數的文章，並顯示摘要
export default class meterPage extends React.Component {
  render() {
    //把風格指數從gatsby-node.js的context傳進來
    const { iceFireNumber } = this.props.pageContext
    //符合這個風格指數的文章陣列
    const posts = this.props.data.allContentfulBlog.edges
    //本頁的網址
    const pageURL = `${this.props.data.site.siteMetadata.siteUrl}/blog/ice-fire-number/${iceFireNumber}/`;
    //master slider是一個可以拉動的range input
    //master list用來放多篇文章預覽的框框
    //meter card用來放文章預覽
    //如果那個風格指數沒資料，就會顯示沒有相關文章
    return (
      <Layout>
        <SEO title="ice fire number" pageURL={pageURL} />
        <MeterSlider fireNumber={iceFireNumber}/>
        <MeterList>
          {
            posts.length ?
              posts.map((element) => {
                const { node } = element;
                const { slug, title, publishedDate, iceFireNumber } = node;
                const { timeToRead } = node.articles.childMarkdownRemark;
                const description = node.description || node.articles
                const {excerpt} = description.childMarkdownRemark
                return (
                    <MeterCard
                      slug={slug.toLowerCase()}
                      key={`meter-${iceFireNumber}-${slug}`} 
                      iceFireNumber={iceFireNumber}
                      postTitle={title}
                      publishedDate={publishedDate}
                      excerpt={excerpt}
                      timeToRead={(timeToRead * 1.5)}
                      imageSrc={node.images[0].fluid}
                    />
                )
              })
              :
              (<div className="w-100 tc dark-gray vh-50">
                沒有相關文章
              </div>)
          }
        </MeterList>
      </Layout>
    )
  }
}

//gatsby會從node那邊傳$filterNumber的變數過來
//[Int!]是指定$filterNumber傳過來的type會是整數的陣列，驚嘆號代表必要欄位
//傳過來的陣列是某個風格指數，和其前後各一個整數構成的
//$iceFireNumber那邊的in:代表的是，只要iceFireNumber符合陣列裡的任何一個數，就會抓資料回來
export const meterQuery = graphql`
  query meterQuery($filterNumber: [Int!]){
    allContentfulBlog(filter: {iceFireNumber: {in: $filterNumber}}) {
      edges {
        node {
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
    site {
        siteMetadata {
            siteUrl
        }
    }
  }
`
