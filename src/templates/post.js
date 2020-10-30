import { graphql } from 'gatsby';
import React from 'react';

export default function Template ({data}) {
    const {markdownRemark: post} = data;
    //const post = data.markdownRemark;

    return(
        <div>
            <h1>{post.frontmatter.title}</h1>
            <div>
                <div dangerouslySetInnerHTML={{__html:post.html}}/>
            </div>
        </div>
    )
}


export const postQuery = graphql `
    query BlogPostByPath($slug: String!){
        markdownRemark(frontmatter: { slug: { eq: $slug} }) {
            html
            frontmatter {
                slug
                title
                date(formatString: "MMMM DD, YYYY")
                published
            }
        }
    }
`