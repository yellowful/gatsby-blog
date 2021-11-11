import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import TimeToRead from "../TimeToRead/TimeToRead"

//用來產生index page的文章預覽
const Card = ({ node }) => {
  //用來放每一篇文章的相關資料
  const { title, publishedDate, iceFireNumber } = node
  const images = getImage(node.images[0])
  const { timeToRead } = node.articles.childMarkdownRemark
  const description = node.description || node.articles
  const { excerpt } = description.childMarkdownRemark
  const slug = node.slug.toLowerCase()
  //如果沒有圖，會顯示沒有圖片
  //其餘顯示圖片、標題、摘要、更多按鈕
  return (
    <article className="br2 dark-gray b--black-10 bg-light-gray">
      <Link to={`/blog/${slug}/`}>
        {images ? (
          <GatsbyImage
            className="db w-100 br2 br--top"
            image={images}
            alt={title}
          />
        ) : (
          <h2 className="tc mv4 gray">沒有圖片</h2>
        )}
      </Link>
      <div className="pa2 ph3-ns pb3-ns">
        <div className="dt w-100">
          <header className="w-100">
            <Link to={`/blog/${slug}/`}>
              <h3 className="f5 f4-ns fw6 dark-gray mv0">{title}</h3>
            </Link>
          </header>
          <TimeToRead
            publishedDate={publishedDate}
            timeToRead={Math.round(timeToRead * 1.5)}
            iceFireNumber={iceFireNumber}
            isGrid={true}
          />
        </div>
        <section className="f6 lh-copy measure mt2 mid-gray">{excerpt}</section>
        <footer className="pointer tr">
          <Link to={`/blog/${slug}/`}>
            更多
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </Link>
        </footer>
      </div>
    </article>
  )
}

export default Card
