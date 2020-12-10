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
                        tag {
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
                    data.allContentfulAllTag.edges.map((node) => {
                        return (
                            <li key={`標籤-${node.slug}`}>
                                <Link to={`標籤-${node.slug}`}>
                                    {node.slug}
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
