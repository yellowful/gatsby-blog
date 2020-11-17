import { Link } from "gatsby"
//import PropTypes from "prop-types"
import React, { useState, useRef }from "react"
import Image from "./image"
//import logo from "../images/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherAlt, faIdCard, faFileCode } from '@fortawesome/free-solid-svg-icons'

const Header = ({ siteTitle }) => {

const [hamburgerExpand,setHamburgerExpand] = useState(['','has-background-dark']);
const hamburgerButton = useRef(null);

console.log(hamburgerExpand)

  return(
    <div className={`w-100 flex justify-center`}>
      <div className="has-background-dark w-10-m w-20-l" />
      <nav className="navbar is-dark w-100 w-90-m w-60-l" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link 
              to="/"
              >
              <span>
                {/* <img className="mb0 dib v-mid" alt="logo" src={logo}/> */}
                <div className="dib v-mid"><Image /></div>
                <p className="dib v-mid white f5 fw4">發抖狙擊手</p>
              </span>
            </Link>
          </div>
          <div 
            className={`navbar-burger burger ${hamburgerExpand[0]}`} 
            aria-label="menu" 
            aria-expanded="false" 
            data-target="navbarBasicExample"
            role = "button"
            tabIndex="-1"
            ref={hamburgerButton}
            onClick={()=>{
              setHamburgerExpand(hamburgerExpand[0]?['','']:['is-active','']);
              hamburgerButton.current.blur();
            }}
            onKeyDown={(event)=>{
              if(event.key==='Enter'){
                setHamburgerExpand(hamburgerExpand[0]?['','']:['is-active',''])
                hamburgerButton.current.blur();
              }
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div id="navbarBasicExample" className={`navbar-menu ${hamburgerExpand[0]}`}>
          <div 
            role = "menu"
            tabIndex="-2"
            className="navbar-end"
            onClick={()=>{
              setHamburgerExpand(['','has-background-dark']);
              hamburgerButton.current.blur();
            }}
            onKeyDown={(event)=>{
              if(event.key==='Enter'){
                setHamburgerExpand(['','has-background-dark'])
                hamburgerButton.current.blur();
              }
            }}  
          >
            <Link 
              to="/blog" 
              className="navbar-item mh3"
              activeClassName="is-active"
            >
              <FontAwesomeIcon icon={faFeatherAlt} />文章
            </Link>
            <Link 
              to="/about" 
              className="navbar-item mh3"
              activeClassName="is-active"
            >
              <FontAwesomeIcon icon={faIdCard} />作者
            </Link>
            <Link 
              to="/project" 
              className="navbar-item mh3"
              activeClassName="is-active"
            >
              <FontAwesomeIcon icon={faFileCode} />作品集
            </Link>
          </div>
        </div>
      </nav>
      <div className="has-background-dark w-10-m w-20-l" />
    </div>
  )
}



export default Header
