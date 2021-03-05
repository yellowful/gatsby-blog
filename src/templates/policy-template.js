import { graphql } from 'gatsby';
import React from 'react';
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"

export default function PolicyTemplate({ data }) {

    const post = data.contentfulPrivacyPolicy.privacyPolicyContent.childMarkdownRemark;
    const imageURL = data.site.siteMetadata.image
    const { excerpt } = post
    const { title } = data.contentfulPrivacyPolicy
    const fbHref = `${data.site.siteMetadata.siteUrl}/terms-n-policy/${data.contentfulPrivacyPolicy.slug.toLowerCase()}/`;
    
    return (
        <Layout>
            <SEO title={title} imageURL={imageURL} pageURL={fbHref} isArticle={false} description={excerpt} />
            <div className="w-100 bg-light-gray">
                <div className="mh3 w-90-m w-80-l mw8 center-ns bg-light-gray">
                    <section>
                        <div dangerouslySetInnerHTML={{ __html: post.html }} />
                    </section>
                </div>
            </div>
        </Layout>
    )
}

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

