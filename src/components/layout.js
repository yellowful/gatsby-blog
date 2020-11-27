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
//import "./layout.css"
import "./mystyles.css"
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
    <div className="flex flex-column items-center">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className="w-100 flex flex-column items-center">{children}</main>
      <footer className="mt4">
        © {new Date().getFullYear()}, Built with
          {`Richard`}
        <a href="https://bugdetective.netlify.app/">Bug Detective Richard</a>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
