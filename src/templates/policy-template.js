import { graphql } from 'gatsby';
import React from 'react';
import GoBack from '../components/GoBack/GoBack';
import Layout from "../components/Layout/layout"
import Seo from "../components/seo/seo"


//用來自動產生policy網頁內容的template
export default function PolicyTemplate({ data }) {
    //這篇policy的markdown裡的內容
    const post = data.contentfulPrivacyPolicy.privacyPolicyContent.childMarkdownRemark;
    //網站的代表圖，要給seo用的
    const imageURL = data.site.siteMetadata.image
    //policy的摘要
    const { excerpt } = post
    //policy的title
    const { title } = data.contentfulPrivacyPolicy
    //這篇policy的完整網址，要給seo用
    const fbHref = `${data.site.siteMetadata.siteUrl}/terms-n-policy/${data.contentfulPrivacyPolicy.slug.toLowerCase()}/`;
    //section裡面就是policy的內容
    //go back是回上一頁的扭
    return (
        <Layout>
            <Seo title={title} imageURL={imageURL} pageURL={fbHref} isArticle={false} description={excerpt} />
            <div className="w-100 bg-light-gray">
                <div className="mh3 w-90-m w-80-l mw8 center-ns bg-light-gray">
                    <section>
                        <div dangerouslySetInnerHTML={{ __html: post.html }} />
                    </section>
                    <GoBack />
                </div>
            </div>
        </Layout>
    )
}
//用來把這一個policy的資料抓下來
export const policyQuery = graphql`
    query policyByPath($slug: String!){
        contentfulPrivacyPolicy(slug: {eq: $slug}) {
            privacyPolicyContent {
                childMarkdownRemark {
                    html
                    excerpt(format: PLAIN, pruneLength: 150, truncate: true)
                }
            }
            slug
            title
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

