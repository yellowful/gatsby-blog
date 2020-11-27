import { graphql } from 'gatsby';
import React from 'react';

export default function Template ({data}) {
    //const {markdownRemark: post} = data;
    //const post = data.markdownRemark;
    const post = data.contentfulBlog.articles.childMarkdownRemark;

    return(
        <div>
            {/* <h1>{post.frontmatter.title}</h1> */}
            <div>
                <div dangerouslySetInnerHTML={{__html:post.html}}/>
            </div>
        </div>
    )
}


export const postQuery = graphql `
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

