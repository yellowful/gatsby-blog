import { Link } from "gatsby"
//import PropTypes from "prop-types"
import React, { useState, useRef } from "react"
import Image from "./image"
//import logo from "../images/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherAlt, faIdCard, faFileCode } from '@fortawesome/free-solid-svg-icons'
import './header.css'

const Header = ({ siteTitle }) => {

  const [hamburgerExpand, setHamburgerExpand] = useState('');
  const hamburgerButton = useRef(null);

  console.log(hamburgerExpand)

  return (
    <div className="has-background-dark w-100 flex justify-center">
      <nav className="navbar is-dark w-100 w-90-m w-70-l" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link
              to="/"
            >
              <span>
                {/* <img className="mb0 dib v-mid" alt="logo" src={logo}/> */}
                <div className="dib v-mid"><Image /></div>
                <p className="dib v-mid near-white f5 fw4">蟲探理查</p>
              </span>
            </Link>
          </div>
          <div
            className={`navbar-burger burger ${hamburgerExpand}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            role="button"
            tabIndex="-1"
            ref={hamburgerButton}
            onClick={() => {
              hamburgerButton.current.blur();
              setHamburgerExpand(hamburgerExpand ? '' : 'is-active');
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                hamburgerButton.current.blur();
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
              to="/blog"
              className="navbar-item tr mr3"
              activeClassName="is-active"
            >
              <FontAwesomeIcon icon={faFeatherAlt} />文章
            </Link>
            <Link
              to="/about"
              className="navbar-item tr mr3"
              activeClassName="is-active"
            >
              <FontAwesomeIcon icon={faIdCard} />作者
            </Link>
            <Link
              to="/project"
              className="navbar-item tr mr3"
              activeClassName="is-active"
            >
              <FontAwesomeIcon icon={faFileCode} />作品集
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}



export default Header
