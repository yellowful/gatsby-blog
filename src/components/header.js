//import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"

const Header = ({ siteTitle }) => {
  return(
    <>
      <DesktopNav />
      <MobileNav />
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
