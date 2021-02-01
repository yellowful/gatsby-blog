import { graphql } from 'gatsby';
import React from 'react';
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import FbComments from "../components/FbComments/FbComments"
import TimeToRead from '../components/PostPreview/TimeToRead';
import PostTags from '../components/PostTags/PostTags';


//Template名稱不影響，因為gatsby內部會自己產生component，和這個名稱無關
//這給function主要要回傳單一post，這個post原本是contentful上的markdown，
//被gatsby根據gatsby-config.js的設定，轉換成style好的html，然後這邊graphql再去抓回來，放在props.data裡
//所以gatsby-node.js就會根據這個Template的function所return的jsx，去弄出每一頁
export default function Template({ data }) {

    //post就是根據下面$slug去graphql抓下來這一頁的內容
    const post = data.contentfulBlog.articles.childMarkdownRemark;
    const imageURL = `https:${data.contentfulBlog.images[0].fluid.src}`
    console.log(imageURL);

    //contentful上這篇文章有設定文章title
    //contentful上這篇文章有設定文章的公開時間
    const { title, publishedDate, tag } = data.contentfulBlog


    //這篇文章的完整網址，要用來傳給fb，讓fb的資料庫可以儲存這個網址的所有comments
    const fbHref = `https://bugdetective.netlify.app/blog/${data.contentfulBlog.slug.toLowerCase()}/`;
    
    return (
        <Layout>
            <SEO title={title} datePublished={publishedDate} imageURL={imageURL} pageURL={fbHref} isArticle={true} description={post.excerpt} />
            <div className="w-100 bg-light-gray">
                <div className="mh3 w-90-m w-80-l mw8 center-ns bg-light-gray">
                    <h1 className="font-tc head-1-shadow f2 lh-title fw7 mv3 dark-gray">{title}</h1>
                    <TimeToRead publishedDate={publishedDate.slice(0, 10)} timeToRead={Math.round(post.timeToRead * 1.5)} />
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: post.html }} />
                    </div>
                    <PostTags tag={tag} />
                    <hr className="b--dashed bb b--black-40 bw1 mv5" />
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
            title
            createdAt
            slug
            publishedDate
            updatedAt
            tag {
                slug
            }
            images {
                fluid(maxWidth: 1024) {
                    src
                }
            }
        }
    }
`

