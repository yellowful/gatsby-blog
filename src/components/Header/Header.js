import { Link } from "gatsby"
import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherAlt, faIdCard, faFileCode, faSearch, faThermometerHalf, faTags, faNetworkWired, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import BdrLogo from "../../images/svg/bdrlogo.svg"
import Search from "../Search"

//主要用來放navbar
const Header = ({ siteTitle }) => {
  //設定漢堡按鈕的state
  const [hamburgerExpand, setHamburgerExpand] = useState('');
  //設定搜尋框是否出現
  const [showSearch, setShowSearch] = useState(false);
  //如果漢堡按鈕的state是不打開，那就設成打開；如果是打開，就設成不打開
  const handleClickLink = () => {
    setHamburgerExpand(hamburgerExpand ? '' : 'is-active');
  }
  //設定about page的滑鼠狀態，主要要產生hover的效果
  const [aboutMouseState,setAboutMouseState] = useState('')
  //如果mouse滑進about page，就顯示dropdown
  const handleAboutMouseEnter = () => {
    setAboutMouseState('is-active');
  }
  //如果mouse離開about page，就隱藏dropdown
  const handleAboutMouseLeave = () => {
    setAboutMouseState('');
  }
  //設定mouse是否有進到「文章」dropdown的範圍中的狀態
  const [blogMouseState,setBlogMouseState] = useState('')
  //如果mouse有進入「文章」的dropdown中，就顯示dropdown
  const handleBlogMouseEnter = () => {
    setBlogMouseState('is-active');
  }
  //如果mouse有離開「文章」的dropdown了，就隱藏dropdown
  const handleBlogMouseLeave = () => {
    setBlogMouseState('');
  }

  return (
    <header className="has-background-dark w-100 flex justify-center">
      <nav className="navbar is-expanded is-dark w-100 w-90-m w-80-l mw8" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <header className="navbar-item">
            <Link
              to="/"
              onClick={handleClickLink}
            >
              <span>
                <BdrLogo className="dib v-mid w3 h2" fill="#f4f4f4" />
                <p className="dib v-mid near-white f5 fw4">蟲探理查</p>
              </span>
            </Link>
          </header>

          <div
            className={`navbar-burger burger button-focus ${hamburgerExpand}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            role="button"
            tabIndex="-1"
            onClick={handleClickLink}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setHamburgerExpand(hamburgerExpand ? '' : 'is-active')
              }
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div id="navbarBasicExample" className={`navbar-menu has-background-dark is-shadowless ${hamburgerExpand}`}>
          <div
            role="menu"
            className="navbar-start ml4 nl2-ns"
          >
            <div className={`navbar-item has-dropdown ${blogMouseState} `} role="menuitem" tabIndex="-1" onMouseEnter={handleBlogMouseEnter} onMouseLeave={handleBlogMouseLeave}>
              <Link
                to="/blog-list/"
                className="navbar-link"
                activeClassName="is-active"
                onClick={handleClickLink}
              >
                <FontAwesomeIcon icon={faFeatherAlt} fixedWidth />文章
              </Link>
              <div className="navbar-dropdown">
                <Link to={`/blog/ice-fire-number/4/`} className="navbar-item" activeClassName="is-active" onClick={handleClickLink}>
                <FontAwesomeIcon icon={faThermometerHalf} fixedWidth />風格
                </Link>
                <Link to={`/blog/tags/javascript/`} className="navbar-item" activeClassName="is-active" onClick={handleClickLink}>
                <FontAwesomeIcon icon={faTags} fixedWidth />標籤
                </Link>
              </div>
            </div>
            <div className={`navbar-item has-dropdown ${aboutMouseState}`} role="menuitem" tabIndex="-1" onMouseEnter={handleAboutMouseEnter} onMouseLeave={handleAboutMouseLeave} >
            <Link
              to="/about/"
              className="navbar-link"
              activeClassName="is-active"
              onClick={handleClickLink}
            >
              <FontAwesomeIcon icon={faIdCard} fixedWidth />關於
            </Link>
            <div className="navbar-dropdown">
                <Link to={`/about/#site`} className="navbar-item" activeClassName="is-active" onClick={handleClickLink}>
                <FontAwesomeIcon icon={faNetworkWired} fixedWidth />網站
                </Link>
                <Link to={`/about/#bio`} className="navbar-item" activeClassName="is-active" onClick={handleClickLink}>
                <FontAwesomeIcon icon={faIdCard} fixedWidth />作者
                </Link>
                <Link to={`/about/#contact`} className="navbar-item" activeClassName="is-active" onClick={handleClickLink}>
                <FontAwesomeIcon icon={faEnvelope} fixedWidth />聯繫
                </Link>
              </div>
            </div>
            <Link
              to="/project/"
              className="navbar-item "
              activeClassName="is-active"
              onClick={handleClickLink}
            >
              <FontAwesomeIcon icon={faFileCode} fixedWidth />作品集
            </Link>
          </div>
          <div
            role="menu"
            className="navbar-end tc"
          >
            <div
              className="navbar-item"
              role="button"
              tabIndex="-1"
              onClick={() => {
                setHamburgerExpand(hamburgerExpand ? '' : 'is-active');
                setShowSearch(true);
              }}
              onKeyDown={(event) => {
                if (event.key === 's') {
                  setHamburgerExpand(hamburgerExpand ? '' : 'is-active')
                  setShowSearch(true);
                }
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
      </nav>
      <Search indexName={`allPages`} showSearch={showSearch} setShowSearch={setShowSearch} />
    </header>
  )
}



export default Header
