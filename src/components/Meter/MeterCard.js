import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import TimeToRead from "../TimeToRead/TimeToRead"

//在風格指數的頁面下，單篇文章的預覽
//顯示標題、摘要、圖片、閱讀時間、繼續閱讀的按鈕等
const MeterCard = ({
  slug,
  iceFireNumber,
  postTitle,
  publishedDate,
  excerpt,
  image,
  timeToRead,
}) => {
  return (
    <article className="pt3 pb2 bt bb b--black-10 ph1 ph0-l">
      <div className="flex flex-column flex-row-ns">
        <div
          key={`meter-card-content/blog/${slug}/`}
          className="w-100 w-60-ns pr3-ns order-2 order-1-ns"
        >
          <Link to={`/blog/${slug}/`}>
            <h1 className="f3 fw7 athelas mt0 lh-title head-1-shadow dark-gray">
              {postTitle}
            </h1>
          </Link>
          <section className="f5 f4-l lh-copy">
            <span>{excerpt}</span>
          </section>
          <footer className="f5 f4-l lh-copy tr">
            <Link to={`/blog/${slug}/`}>
              繼續閱讀
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Link>
          </footer>
        </div>
        <div
          key={`meter-card-image/blog/${slug}/`}
          className="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns"
        >
          <Link to={`/blog/${slug}/`}>
            <GatsbyImage className="db" image={image} alt={postTitle} />
          </Link>
        </div>
      </div>
      <TimeToRead
        iceFireNumber={iceFireNumber}
        publishedDate={publishedDate}
        timeToRead={Math.round(timeToRead * 1.5)}
        isGrid={false}
      />
    </article>
  )
}

export default MeterCard
