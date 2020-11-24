/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import 'bulma/css/bulma.css'
import 'tachyons'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="grid-container">
      <div className="grid-nav-blank has-background-dark" />
      <div className="grid-navbar">
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      </div>
      <div className="grid-nav-blank  has-background-dark" />
      <div className="grid-sidebar" />
      <div className="grid-main">
        <main>{children}</main>
      </div>
      <div className="grid-sidebar" />
      <div className="grid-foot-side" />
      <div className="grid-footer">
        <footer className="mt4">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
      <div className="grid-foot-side" />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
