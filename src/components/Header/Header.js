import { Link } from "gatsby"
import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherAlt, faIdCard, faFileCode, faSearch} from '@fortawesome/free-solid-svg-icons'
import BdrLogo from "../../images/svg/bdrlogo.svg"
import Search from "../Search"

const Header = ({ siteTitle }) => {
  
  const searchIndices = [{ name: `BlogPage`}, {name: `AboutPage`},{name: `ProjectPage` }]
  const [hamburgerExpand, setHamburgerExpand] = useState('');
  const [showSearch,setShowSearch]=useState(false);

  return (
    <header className="has-background-dark w-100 flex justify-center">
      <nav className="navbar is-dark w-100 w-90-m w-80-l mw8" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <header className="navbar-item">
            <Link
              to="/"
            >
              <span>
                {/* <img className="mb0 dib v-mid" alt="logo" src={logo}/> */}
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
            onClick={() => {
              setHamburgerExpand(hamburgerExpand ? '' : 'is-active');
            }}
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
            className="navbar-end"
          >
            <Link
              to="/blog/"
              className="navbar-item tr mr3"
              activeClassName="is-active"
            >
              <FontAwesomeIcon icon={faFeatherAlt} />文章
            </Link>
            <Link
              to="/about/"
              className="navbar-item tr mr3"
              activeClassName="is-active"
            >
              <FontAwesomeIcon icon={faIdCard} />作者
            </Link>
            <Link
              to="/project/"
              className="navbar-item tr mr3"
              activeClassName="is-active"
            >
              <FontAwesomeIcon icon={faFileCode} />作品集
            </Link>
            <div
              className="navbar-item tr mr4 mr0-l"
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
      <Search indices={searchIndices} showSearch={showSearch} setShowSearch={setShowSearch} />
    </header>
  )
}



export default Header
