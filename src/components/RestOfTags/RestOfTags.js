import React from 'react'
import { graphql, useStaticQuery, Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faTags } from '@fortawesome/free-solid-svg-icons'

//放在tag list template裡面，用來顯示和排列剩下的tag
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
      }
    `
  )
  //nowrap overflow-x-auto讓tags可以橫向捲動
  //sort可以應付edges的length為0的特殊情況
  //map在做，如果slug剛好是傳入的slug，就不顯示，反之就顯示出來
  //如果tag裡面沒有blog的屬性，就顯示為0，有就顯示blog的數字
  return (
    <div className="w-100 flex flex-column flex-row-ns items-center">
      <header className="w-100 w-50-m w-30-l">
        <span className="dib v-mid">
          <span className="f3 pv1 ph2 dib v-mid"><FontAwesomeIcon icon={faTag} /></span>
          <h1 className="f3 fw7 pv1 ph2 dib v-mid" >
            {tagSlug}
          </h1>
        </span>
      </header>
      <section className="w-100 flex justify-start items-center">
        <div className="dib v-mid ph2 mv1 f3">
          <FontAwesomeIcon icon={faTags} />
        </div>
        <div className="dib v-mid nowrap overflow-x-auto">
          {
            data.allContentfulAllTag.edges.sort((a, b) => {
              const lengthA = a.node.blog ? a.node.blog.length : 0;
              const lengthB = b.node.blog ? b.node.blog.length : 0;
              return lengthB - lengthA
            })
            .map((item, i) => {
              if (item.node.slug.toLowerCase() === tagSlug.toLowerCase()) {
                return null
              } else {
                return (
                  <article key={`rest-tags-${item.node.slug.toLowerCase()}`} className="br-pill bg-moon-gray pv1 ph3 mr2 mv1 dib v-mid">
                    <Link to={`/blog/tags/${item.node.slug.toLowerCase()}/`} className="dib f5 v-btm">
                      {`${item.node.slug.toLowerCase()}`}
                    </Link>
                    <span className="f7 dib v-btm">{`+${item.node.blog ? item.node.blog.length : 0}`}</span>
                  </article>
                )
              }
            })
          }
        </div>
      </section>
    </div>
  )
}

export default RestOfTags
