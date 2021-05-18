import { graphql } from 'gatsby';
import { getSrc } from "gatsby-plugin-image";
import React from 'react';
import Layout from "../components/Layout/layout"
import Seo from "../components/Seo/seo"
import FbComments from "../components/FbComments/FbComments"
import TimeToRead from '../components/TimeToRead/TimeToRead';
import PostTags from '../components/PostTags/PostTags';
import BuyMeACoffee from '../components/BuyMeACoffee/BuyMeACoffee'

//Template名稱不影響，因為gatsby內部會自己產生component，和這個名稱無關
//這給function主要要回傳單一post，這個post原本是contentful上的markdown，
//被gatsby根據gatsby-config.js的設定，轉換成style好的html，然後這邊graphql再去抓回來，放在props.data裡
//所以gatsby-node.js就會根據這個Template的function所return的jsx，去弄出每一頁
export default function Template({ data }) {
    //post就是根據下面$slug去graphql抓下來這一頁的內容
    const { title, publishedDate, updatedAt, tag, iceFireNumber, images, slug, description, articles } = data.contentfulBlog
    const post = articles.childMarkdownRemark;
    const { siteUrl,image } = data.site.siteMetadata
    const imageURL =
    getSrc(images[0]) ?
        'https:'+getSrc(images[0])
        :
        siteUrl+image
    
    const postDescription = description || articles
    const { excerpt } = postDescription.childMarkdownRemark
    const fbHref = `${siteUrl}/blog/${slug.toLowerCase()}/`;

    //time to read裡面其實包含了閱讀時間、出版日期、風格數字、作者連結
    //頁尾有文章更新的日期
    //post tags是這篇文章的tags
    //buy me a coffee是贊助的連結
    //fb comments是用來按讚和留言的地方
    return (
        <Layout>
            <Seo title={title} datePublished={publishedDate} imageURL={imageURL} pageURL={fbHref} isArticle={true} description={excerpt} />
            <div className="w-100 bg-light-gray">
                <div className="mh3 w-90-m w-80-l mw8 center-ns bg-light-gray">
                    <h1 className="head-1-shadow f2 lh-title fw7 mv3 dark-gray">{title}</h1>
                    <TimeToRead publishedDate={publishedDate} timeToRead={Math.round(post.timeToRead * 1.5)} iceFireNumber={iceFireNumber} isGrid={false} />
                    <section>
                        <div dangerouslySetInnerHTML={{ __html: post.html }} />
                        {
                            updatedAt ?
                                (
                                    <footer className="f7 mv4 gray">
                                        {updatedAt} 更新
                                    </footer>
                                )
                                :
                                null
                        }
                    </section>
                    <PostTags tag={tag} />
                    <hr className="bb b--black-30 mv4" />
                    <BuyMeACoffee />
                    <FbComments fbHref={fbHref} />
                </div>
            </div>
        </Layout>
    )
}

//如果是單一頁面，不是要gatsby自動產出的，那個頁面的query要用useStaticQuery
//這個檔案是當成template，不是自己要刻的，是要給gatsby-node照樣大量產出的，所以這個頁面的query要用graphql
//gatsby會讓$slug從node.js傳過來，query可以在”http://localhost:8000/___graphql“找自己想query的東西，再拷貝過來
//BlogPostByPath是自己取的，其實不會用到
export const postQuery = graphql`
    query BlogPostByPath($slug: String!){
        contentfulBlog(slug: {eq: $slug}) {
            articles {
              childMarkdownRemark {
                html
                timeToRead
                excerpt(format: PLAIN, pruneLength: 150, truncate: true)
              }
            }
            description {
              childMarkdownRemark {
                excerpt(pruneLength: 150, truncate: true, format: PLAIN)
              }
            }
            title
            createdAt
            slug
            iceFireNumber
            publishedDate(formatString: "MMMM DD, YYYY")
            updatedAt(formatString: "MMMM DD, YYYY", locale: "zh-TW")
            tag {
                slug
                tagName
            }
            images {
                gatsbyImageData(layout: FIXED)
            }
        }
        site {
          siteMetadata {
            title
            image
            siteUrl
          }
        }
    }
`

