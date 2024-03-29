import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import TimeToRead from "../TimeToRead/TimeToRead"

//在blog post裡面的單一文章預覽
//顯示了標題、摘要、預計閱讀時間的component、繼續閱讀的按鈕
const PostPreview = ({
  slug,
  iceFireNumber,
  postTitle,
  publishedDate,
  excerpt,
  timeToRead,
}) => {
  return (
    <article className="pv2 pv4-ns bb b--black-10 flex flex-column">
      <div className="w-100 pr3-ns">
        <Link to={`/blog/${slug}/`}>
          <h1 className="head-1-shadow f2 lh-title fw7 mv4 dark-gray">
            {postTitle}
          </h1>
        </Link>
        <TimeToRead
          publishedDate={publishedDate}
          timeToRead={Math.round(timeToRead * 1.5)}
          iceFireNumber={iceFireNumber}
          isGrid={false}
        />
        <section className="excerpt-gradient ph1-ns pl2">
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        </section>
      </div>
      <footer className="w-100 tr">
        <Link to={`/blog/${slug}/`} className="pointer f4 fw3 pr3-ns">
          繼續閱讀
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Link>
      </footer>
    </article>
  )
}

export default PostPreview
