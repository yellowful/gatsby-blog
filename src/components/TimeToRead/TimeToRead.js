import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAt,
  faCalendarAlt,
  faGlasses,
  faSnowflake,
  faFire,
} from "@fortawesome/free-solid-svg-icons"
import { iceRGB, fireRGB } from "../../utils/style-number-color"

//用來顯示作者資訊、出版日期、風格指數、預估閱讀時間
//放在所有blog文章預覽之中，也放在正式的blog文章之中
const TimeToRead = ({ publishedDate, timeToRead, iceFireNumber, isGrid }) => {
  //用百分比來計算一個gradient範圍的顏色
  let percentColors = [
    { pct: 0.0, color: iceRGB },
    { pct: 1.0, color: fireRGB },
  ]

  const getColorForPercentage = pct => {
    for (var i = 1; i < percentColors.length - 1; i++) {
      if (pct < percentColors[i].pct) {
        break
      }
    }
    var lower = percentColors[i - 1]
    var upper = percentColors[i]
    var range = upper.pct - lower.pct
    var rangePct = (pct - lower.pct) / range
    var pctLower = 1 - rangePct
    var pctUpper = rangePct
    var color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
    }
    return "rgb(" + [color.r, color.g, color.b].join(",") + ")"
    // or output as hex if preferred
  }
  //這篇文章的風格指數換算成顏色
  const iceFireColor = getColorForPercentage(iceFireNumber / 10)
  //如果是index那種grid的型態，即使是桌面那麼大的螢幕，TimeToRead的尺寸仍然很小格，所以就會直接讓TimeToRead保持兩行。
  //其餘的就讓他依照有無ns的設定responsive變形
  const classForNoneGrid = [
    isGrid ? "" : "dib-ns w-60-ns flex-none-ns",
    isGrid ? "" : "dib-ns w-40-ns flex-none-ns tr-ns",
  ]
  //如果是平板或桌面，就讓資料顯現為一行
  //如果是手機，就讓資料疊成兩行
  //每一行裡，如果是手機就分開兩邊，如果不是手機，就聚集在同一邊
  return (
    <section className="mv2 w-100 ph2 mv4-ns">
      <div
        key="time-to-read-left"
        className={`f6 w-100 flex justify-between ${classForNoneGrid[0]}`}
      >
        <span key="tim-to-read-writer">
          <Link to="/about/#bio">
            <span key="writer-icon" className="f6">
              <FontAwesomeIcon icon={faAt} />
            </span>
            <span key="writer-text" className="ml2 ml1-m f6">
              蟲探理查
            </span>
          </Link>
        </span>

        <span key="tim-to-read-date" className="ml2 ml3-ns">
          <span className="f6 gray lh-copy ">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </span>
          <time className="ml2 ml1-m f6 gray lh-copy ">{publishedDate}</time>
        </span>
      </div>

      <div
        key="time-to-read-right"
        className={`f6 w-100 flex justify-between ${classForNoneGrid[1]}`}
      >
        <span>
          <span key="read-icon">
            <FontAwesomeIcon icon={faGlasses} />
          </span>
          <span key="read-number" className="ml2 ml1-m">
            約{timeToRead}分鐘
          </span>
        </span>

        <span className="ml2 ml3-ns">
          <Link to={`/blog/style-number/${iceFireNumber}/`}>
            <span
              key="style-text"
              className="f6"
              style={{ color: iceFireColor }}
            >
              風格
            </span>
            {iceFireNumber > 4 ? (
              <span
                key="icon-fire"
                className="f5 ml2 ml1-m"
                style={{ color: iceFireColor }}
              >
                <FontAwesomeIcon icon={faFire} />
              </span>
            ) : (
              <span
                key="icon-ice"
                className="f5 ml2"
                style={{ color: iceFireColor }}
              >
                <FontAwesomeIcon icon={faSnowflake} />
              </span>
            )}
          </Link>
        </span>
      </div>
    </section>
  )
}

export default TimeToRead
