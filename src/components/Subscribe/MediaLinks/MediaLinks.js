import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import { faRss } from "@fortawesome/free-solid-svg-icons"
import BuyMeACoffee from "../../BuyMeACoffee/BuyMeACoffee"

//用來顯示external link，放在SubscribeContainer裡面
const MediaLinks = () => {
  //把link和icon設成array方便之後render
  const externalLink = [
    "https://github.bdr.rocks",
    "https://fb.bdr.rocks",
    "https://in.bdr.rocks",
  ]
  const icons = [faGithub, faFacebook, faLinkedin]
  //用來顯示所有external link
  //BuyMeACoffee自己一列，其他第二列，剛好解決原本和SubScribe高度差太多看起來很怪的問題
  //桌面版會出現左邊的格線
  const ariaLabel = ['Github', 'Facebook', 'Linkedin']
  return (
    <div className="flex flex-column bl-l b--black-30">
      <BuyMeACoffee />
      <div className="flex justify-around items-end-ns mb2">
        {externalLink.map((item, i) => {
          // console.log('MediaLinks',item)
          return (
            <div key={item} className="w-10 tc">
              <a
                aria-label={ariaLabel[i]}
                href={item}
                rel="noreferrer"
                target="_blank"
                className="f3 f2-ns"
              >
                <FontAwesomeIcon icon={icons[i]} />
              </a>
            </div>
          )
        })}
        <div key="rss.xml" className="w-10 tc">
          <Link to={`/rss.xml`} className="f3 f2-ns">
            <FontAwesomeIcon icon={faRss} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MediaLinks
