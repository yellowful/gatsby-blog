import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import MeterCard from "../components/Meter/MeterCard"
import MeterList from "../components/Meter/MeterList"
import MeterSlider from "../components/Meter/MeterSlider"

//根據gatsby-node.js傳來的this.props.pageContext，和graphql抓回來的this.props.data，來自動建立blogs列表和pagination
export default class meterPage extends React.Component {
  render() {
    const { iceFireNumber } = this.props.pageContext
    const posts = this.props.data.allContentfulBlog.edges
    const pageURL = `https://www.bdr.rocks/blog/ice-fire-number/${iceFireNumber}/`;
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
                const { excerpt, timeToRead } = node.articles.childMarkdownRemark;
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

//如果是單一頁面，不是要gatsby自動產出的，那個頁面的query要用useStaticQuery
//這個檔案是當成template，不是自己要刻的，是要給gatsby-node照樣大量產出的，所以這個頁面的query要用graphql
//gatsby會從node那邊傳$skip和$limit的變數過來，目的是，當目前在做第2頁的時候，可以略過第1頁的資料($skip)，只抓1頁的資料($limit)
//pruneLength是指摘要的字數，truncate是指如果摘要有非英語系的文字，就要設成true，format可以抓html或純文字或markdown
//$iceFireNumber是node.js的context傳過來的變數，Int是型別，驚嘆號代表必要欄位

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
`
