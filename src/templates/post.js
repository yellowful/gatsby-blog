import { graphql } from 'gatsby';
import React from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"
import FbComments from "../components/FbComments"



export default function Template({ data }) {
    //const {markdownRemark: post} = data;
    //const post = data.markdownRemark;
    const post = data.contentfulBlog.articles.childMarkdownRemark;
    const title = data.contentfulBlog.title;
    const fbHref = 'http://localhost:8000/blog/' + data.contentfulBlog.slug;

    return (
        <Layout>
            <SEO title={title} />
            <div className="w-100 bg-light-gray">
                <div className="mh3 mh0-ns w-80-m w-60-l center-ns bg-light-gray">
                    <h1 className="font-tc head-1-shadow f2 lh-title fw7 mv3 dark-gray">{title}</h1>
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: post.html }} />
                    </div>
                    <FbComments fbHref={fbHref} />
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

