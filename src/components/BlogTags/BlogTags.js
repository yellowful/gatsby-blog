import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

const BlogTags = () => {
    const data = useStaticQuery(
        graphql`
            query {
                allContentfulAllTag {
                    edges {
                        node {
                            slug
                            blog {
                                slug
                            }
                        }
                    }
                }
            }
        `
    )
    return (
        <div>
            <ol>
                {
                    data.allContentfulAllTag.edges.map((item) => {
                        return (
                            <li key={`標籤-${item.node.slug}`}>
                                <Link to={`../標籤/${item.node.slug}`}>
                                    {item.node.slug}
                                </Link>
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
}



export default BlogTags
