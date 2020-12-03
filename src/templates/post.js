import { graphql } from 'gatsby';
import React from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"



export default function Template({ data }) {
    //const {markdownRemark: post} = data;
    //const post = data.markdownRemark;
    const post = data.contentfulBlog.articles.childMarkdownRemark;
    const title = data.contentfulBlog.title;

    return (
        <Layout>
            <SEO title={title} />
            <div className="w-100 bg-light-gray">
                <div className="mh3 mh0-ns w-80-m w-60-l center-ns bg-light-gray">
                    <h1 className="font-tc f2 f1-ns lh-title">{title}</h1>
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: post.html }} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export const postQuery = graphql`
    query BlogPostByPath($slug: String!){
        contentfulBlog(slug: {eq: $slug}) {
            articles {
              childMarkdownRemark {
                html
              }
            }
            title
            createdAt
            slug
            publishedDate
            updatedAt
        }
    }
`

