import React from 'react'
import { graphql, useStaticQuery, Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faTags } from '@fortawesome/free-solid-svg-icons'




const RestOfTags = ({ tagSlug }) => {

    const data = useStaticQuery(
        graphql`
        query RestOfTagsQuery{
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
        }`
    )


    return (
        <>
            <div className="fl w-100 w-50-m w-30-l">
                <span className="dib v-mid">
                    <span className="f3 pv1 ph2 dib v-mid"><FontAwesomeIcon icon={faTag} /></span>
                    <h1 className="f3 pv1 ph2 dib v-mid font-tc">
                        {tagSlug}
                    </h1>
                </span>
            </div>
            <div className="fl w-100 w-50-m w-70-l">
                <div className="dib v-mid pr3">
                    <FontAwesomeIcon icon={faTags} />
                </div>
                <div className="dib v-mid pr3">
                    {
                        data.allContentfulAllTag.edges.map((item, i) => {
                            if (item.node.slug === tagSlug) {
                                return null
                            } else {
                                return (
                                    <span className="dib v-mid pr3">
                                        <Link to={`/blog/tags/${item.node.slug}`} className="dib font-tc f5 v-btm br-pill pv1 ph3 bg-moon-gray">
                                            {`${item.node.slug}`}
                                        </Link>
                                        <span className="mr3 dib v-btm">{`+${item.node.tag.length}`}</span>
                                    </span>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default RestOfTags
