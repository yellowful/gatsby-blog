import React from "react"
import { Helmet } from "react-helmet"
//要給Seo component用的
//google要的metadata的格式
//這邊只有文章會有詳細的meta data，供搜尋結果顯示摘要，其他的就丟普通的網站資料
const GoogleSchema = React.memo(
  ({ isArticle, title, pageURL, imageURL, datePublished, siteUrl }) => {
    const baseSchema = [
      {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": siteUrl,
        },
      },
    ]
    const schema = isArticle
      ? [
          ...baseSchema,
          {
            headline: title,
            url: pageURL,
            image: imageURL,
            datePublished: datePublished,
            author: {
              "@type": "Person",
              name: "黃瑞成",
            },
          },
        ]
      : baseSchema

    //要把object變成程式碼，要用stringify
    return (
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    )
  }
)

export default GoogleSchema
