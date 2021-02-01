import React from 'react'
import { graphql, useStaticQuery, Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faTags } from '@fortawesome/free-solid-svg-icons'




const RestOfTags = ({ tagSlug }) => {

    let data = useStaticQuery(
        graphql`
        query RestOfTagsQuery{
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
        }`
    )



    return (
        <div className="w-100 flex flex-column flex-row-ns items-center">
            <div className="w-100 w-50-m w-30-l">
                <span className="dib v-mid">
                    <span className="f3 pv1 ph2 dib v-mid"><FontAwesomeIcon icon={faTag} /></span>
                    <h1 className="f3 fw7 pv1 ph2 dib v-mid font-tc">
                        {tagSlug}
                    </h1>
                </span>
            </div>
            <div className="w-100 flex justify-start items-center">
                <div className="dib v-mid ph2 mv1 f3">
                    <FontAwesomeIcon icon={faTags} />
                </div>
                <div className="dib v-mid nowrap overflow-x-auto">
                    {
                        data.allContentfulAllTag.edges.sort((a, b) => {
                            return b.node.blog.length - a.node.blog.length
                        })
                        .map((item, i) => {
                            if (item.node.slug.toLowerCase() === tagSlug.toLowerCase()) {
                                return null
                            } else {
                                return (
                                    <div className="br-pill bg-moon-gray pv1 ph3 mr2 mv1 dib v-mid">
                                        <Link to={`/blog/tags/${item.node.slug.toLowerCase()}/`} className="dib font-tc f5 v-btm">
                                            {`${item.node.slug.toLowerCase()}`}
                                        </Link>
                                        <span className="font-tc f7 dib v-btm">{`+${item.node.blog.length}`}</span>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default RestOfTags
