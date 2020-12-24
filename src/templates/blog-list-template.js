import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout/layout"
import SEO from "../components/Seo/seo"
import PostList from "../components/PostPreview/PostList"
import PostPreview from "../components/PostPreview/PostPreview"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'

export default class BlogList extends React.Component {
    render() {
        const { currentPage, numPages } = this.props.pageContext
        const isFirst = currentPage === 1
        const isLast = currentPage === numPages
        const prevPage = currentPage - 1 === 1 ? "/blog" : `/blog/page-${(currentPage - 1).toString()}`
        const nextPage = `/blog/page-${(currentPage + 1).toString()}`
        console.table({ currentPage: currentPage, isFirst: isFirst, isLast: isLast });

        return (
            <Layout>
                <SEO title="文章" />
                <PostList>
                    {
                        this.props.data.allContentfulBlog.edges.map((element) => {
                            const publishedDate = element.node.publishedDate.slice(0, 10)
                            return (
                                <React.Fragment>
                                    <PostPreview
                                        key={`blog${element.node.slug}`}
                                        slug={element.node.slug}
                                        postTitle={element.node.title}
                                        publishedDate={publishedDate}
                                        excerpt={element.node.articles.childMarkdownRemark.excerpt}
                                        postTag={element.node.alltag}
                                        timeToRead={element.node.articles.childMarkdownRemark.timeToRead}
                                    />
                                </React.Fragment>
                            )
                        })
                    }
                </PostList>
                <div className="w-100 flex justify-center bg-light-gray pv3">

                    {
                        isFirst ? null
                            :
                            (
                                <span className="mh2 mh3-ns">
                                    <Link to={prevPage} rel="prev">
                                        <FontAwesomeIcon icon={faStepBackward} />
                                    </Link>
                                </span>
                            )
                    }


                    {
                        Array.from({ length: numPages }, (_, i) => (
                            <span className="mh2 mh3-ns">
                                <Link
                                    key={`pagination-number${i + 1}`}
                                    to={i === 0 ? `/blog` : `/blog/page-${(i + 1).toString()}`}
                                    activeClassName="orange underline o-80"
                                >
                                    {i + 1}
                                </Link>
                            </span>
                        ))
                    }

                    {
                        isLast ? null
                            :
                            (
                                <span className="mh2 mh3-ns">
                                    <Link to={nextPage} rel="next">
                                        <FontAwesomeIcon icon={faStepForward} />
                                    </Link>
                                </span>
                            )
                    }
                </div>
            </Layout>
        )
    }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allContentfulBlog (
        sort: {order: DESC, fields: publishedDate}
        limit:$limit
        skip:$skip
      ){
        edges {
          node {
            articles {
              childMarkdownRemark {
                excerpt(pruneLength: 250, truncate: true, format: HTML)
                timeToRead
              }
            }
            slug
            title
            publishedDate
            alltag {
              slug
            }
            images {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
  }
`