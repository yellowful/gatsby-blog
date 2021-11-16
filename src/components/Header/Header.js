import { Link } from "gatsby"
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFeatherAlt,
  faIdCard,
  faFileCode,
  faSearch,
  faThermometerHalf,
  faTags,
  faNetworkWired,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"
import BdrLogo from "../../images/svg/bdrlogo.svg"
import Search from "../Search"

//主要用來放navbar
const Header = ({ siteTitle }) => {
  //設定漢堡按鈕的state
  const [hamburgerExpand, setHamburgerExpand] = useState("")
  //設定搜尋框是否出現
  const [showSearch, setShowSearch] = useState(false)
  //切換主Menu打開或關起來，把dropmenu都關起來
  const handleClickLink = () => {
    //如果漢堡按鈕的state是不打開，那就設成打開；如果是打開，就設成不打開
    setHamburgerExpand(hamburgerExpand ? "" : "is-active")
    setBlogDopdownState("")
    setAboutDropdownState("")
  }
  //menu展開時，點了logo，要關掉menu
  const handleClickBrand = () => {
    //如果漢堡按鈕的state是不打開，那就設成打開；如果是打開，就設成不打開
    setHamburgerExpand(hamburgerExpand ? "" : "")
    setBlogDopdownState("")
    setAboutDropdownState("")
  }
  //設定about page的滑鼠狀態，主要要產生hover的效果
  const [aboutDropdownState, setAboutDropdownState] = useState("")
  //如果mouse滑進about page，就顯示dropdown
  const handleAboutMouseEnter = () => {
    setAboutDropdownState("is-active")
  }
  //如果mouse離開about page，就隱藏dropdown
  const handleAboutMouseLeave = () => {
    setAboutDropdownState("")
  }
  //設定mouse是否有進到「文章」dropdown的範圍中的狀態
  const [blogDropdownState, setBlogDopdownState] = useState("")
  //如果mouse有進入「文章」的dropdown中，就顯示dropdown
  const handleBlogMouseEnter = () => {
    setBlogDopdownState("is-active")
  }
  //如果mouse有離開「文章」的dropdown了，就隱藏dropdown
  const handleBlogMouseLeave = () => {
    setBlogDopdownState("")
  }
  //如果有touch blog鈕，就執行
  //之所以需要這個function是因為touch和mouse行為不同，event發生的順序是touch、mouse enter、mouse click
  //在touch裡面加上preventDefault，可以避免touch事件發生後，click又在觸法一次
  //這裡是在iPad上的橫向螢幕是在桌面時有dropdown menu的情況下，我們期望這時候是「dropdown是active的時候，touch發生的時候不要又同時去觸發了click，導致Link被觸發，只期望dropdown被設定is-active。dropdown是active的情況下，click會被觸發。」
  const handleBlogTouch = e => {
    //假如dropdown和hamburgerExpand都不是active，則被touch之後，不要觸發click，而是將dropdown設為active
    if (!blogDropdownState && !hamburgerExpand) {
      e.preventDefault()
      //blog被點點時候，順便把隔壁about的dropdown關掉
      setAboutDropdownState("")
      setBlogDopdownState("is-active")
    }
  }
  //如果有touch about鈕，就執行
  const handleAboutTouch = e => {
    //假如dropdown和hamburgerExpand都不是active，則被touch之後，不要觸發click，而是將dropdown設為active
    if (!aboutDropdownState && !hamburgerExpand) {
      e.preventDefault()
      //about被點點時候，順便把隔壁blog的dropdown關掉
      setBlogDopdownState("")
      setAboutDropdownState("is-active")
    }
  }

  return (
    <header className="has-background-dark w-100 flex justify-center">
      <nav
        className="navbar is-expanded is-dark w-100 w-90-m w-80-l mw8"
        role="navigation"
        aria-label="main navigation"
      >
        <div key="navbar-brand" className="navbar-brand">
          <div key="brand-navbar-item" className="navbar-item">
            <Link to="/" onClick={handleClickBrand}>
              <span>
                <BdrLogo className="dib v-mid w3 h2" fill="#f4f4f4" />
                <p className="dib v-mid near-white f5 fw4">蟲探理查</p>
              </span>
            </Link>
          </div>
          <div
            key="menu-navbar-burger"
            className={`navbar-burger burger button-focus ${hamburgerExpand}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            role="button"
            tabIndex="-1"
            onClick={handleClickLink}
            onKeyDown={event => {
              if (event.key === "Enter") {
                setHamburgerExpand(hamburgerExpand ? "" : "is-active")
              }
            }}
          >
            <span key="span1" aria-hidden="true"></span>
            <span key="span2" aria-hidden="true"></span>
            <span key="span3" aria-hidden="true"></span>
          </div>
        </div>
        <div
          key="navbar-main-menu"
          id="menuId"
          className={`navbar-menu has-background-dark is-shadowless ${hamburgerExpand}`}
        >
          <div
            key="navbar-start"
            role="menu"
            className="navbar-start ml4 nl2-ns"
          >
            <div
              key="navbar-item-blog-list"
              className={`navbar-item has-dropdown ${blogDropdownState} `}
              role="menuitem"
              tabIndex="-1"
              onMouseEnter={handleBlogMouseEnter}
              onMouseLeave={handleBlogMouseLeave}
              onTouchEnd={handleBlogTouch}
            >
              <Link
                to="/blog-list/"
                className="navbar-link"
                activeClassName="is-active"
                onClick={handleClickLink}
              >
                <FontAwesomeIcon icon={faFeatherAlt} fixedWidth />
                文章
              </Link>
              <div className="navbar-dropdown">
                <Link
                  key="nav-/style-number/"
                  to={`/style-number/`}
                  className="navbar-item"
                  activeClassName="is-active"
                  onClick={handleClickLink}
                >
                  <FontAwesomeIcon icon={faThermometerHalf} fixedWidth />
                  風格
                </Link>
                <Link
                  key="nav-/blog/tags/javascript/"
                  to={`/blog/tags/javascript/`}
                  className="navbar-item"
                  activeClassName="is-active"
                  onClick={handleClickLink}
                >
                  <FontAwesomeIcon icon={faTags} fixedWidth />
                  標籤
                </Link>
              </div>
            </div>
            <div
              key="navbar-item-about"
              className={`navbar-item has-dropdown ${aboutDropdownState}`}
              role="menuitem"
              tabIndex="-1"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
              onTouchEnd={handleAboutTouch}
            >
              <Link
                to="/about/"
                className="navbar-link"
                activeClassName="is-active"
                onClick={handleClickLink}
              >
                <FontAwesomeIcon icon={faIdCard} fixedWidth />
                關於
              </Link>
              <div className="navbar-dropdown">
                <Link
                  key="nav-/about/#site"
                  to={`/about/#site`}
                  className="navbar-item"
                  activeClassName="is-active"
                  onClick={handleClickLink}
                >
                  <FontAwesomeIcon icon={faNetworkWired} fixedWidth />
                  網站
                </Link>
                <Link
                  key="nav-/about/#bio"
                  to={`/about/#bio`}
                  className="navbar-item"
                  activeClassName="is-active"
                  onClick={handleClickLink}
                >
                  <FontAwesomeIcon icon={faIdCard} fixedWidth />
                  作者
                </Link>
                <Link
                  key="nav-/about/#contact"
                  to={`/about/#contact`}
                  className="navbar-item"
                  activeClassName="is-active"
                  onClick={handleClickLink}
                >
                  <FontAwesomeIcon icon={faEnvelope} fixedWidth />
                  聯繫
                </Link>
              </div>
            </div>
            <Link
              to="/project/"
              className="navbar-item "
              activeClassName="is-active"
              onClick={handleClickLink}
            >
              <FontAwesomeIcon icon={faFileCode} fixedWidth />
              作品集
            </Link>
          </div>
          <div key="navbar-end" role="menu" className="navbar-end tc">
            <div
              className="navbar-item"
              aria-label="search"
              role="button"
              tabIndex="-1"
              onClick={() => {
                setHamburgerExpand(hamburgerExpand ? "" : "is-active")
                setShowSearch(true)
              }}
              onKeyDown={event => {
                if (event.key === "s") {
                  setHamburgerExpand(hamburgerExpand ? "" : "is-active")
                  setShowSearch(true)
                }
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
      </nav>
      <Search
        indexName={`allPages`}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
    </header>
  )
}

export default Header
