import { Link } from "gatsby"
//import PropTypes from "prop-types"
import React, { useState, useRef }from "react"
import Image from "./image"
//import logo from "../images/logo.png"

const Header = ({ siteTitle }) => {

const [hamburgerExpand,setHamburgerExpand] = useState('');
const hamburgerButton = useRef(null);


  return(
    <div>
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
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
            className={`navbar-burger burger ${hamburgerExpand}`} 
            aria-label="menu" 
            aria-expanded="false" 
            data-target="navbarBasicExample"
            role = "button"
            tabIndex={0}
            ref={hamburgerButton}
            onClick={()=>{
              setHamburgerExpand(hamburgerExpand?'':'is-active');
              hamburgerButton.current.blur();
            }}
            onKeyDown={(event)=>{
              if(event.key==='Enter'){
                setHamburgerExpand(hamburgerExpand?'':'is-active')
                hamburgerButton.current.blur();
              }
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div id="navbarBasicExample" className={`navbar-menu ${hamburgerExpand}`}>
          <div className="navbar-end">
            <Link 
              to="/" 
              className="navbar-item"
              activeClassName="is-active"
            >
              文章
            </Link>
            <Link 
              to="/about" 
              className="navbar-item"
              activeClassName="is-active"
            >
              作者
            </Link>
            <Link 
              to="/project" 
              className="navbar-item"
              activeClassName="is-active"
            >
              作品集
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}



export default Header
