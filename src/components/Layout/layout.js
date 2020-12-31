/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import "./mystyles.css"
import 'tachyons'
import "./layout.css"
import { FacebookProvider } from 'react-facebook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'



const Layout = ({ children }) => {

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const onScrollTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  const onKeyScroll = (event) => {
    if (event.key === "ArrowUp")
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
  }

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
      <FacebookProvider appId="129888612117049">
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main className="w-100 flex flex-column">{children}</main>
        <Footer />
      </FacebookProvider>
      {
        scrollPosition >= 1024 ?
          <div className="tc light-blue o-80 f3 br3 fixed bottom-3 right-1 w2 h2 bw0 button-focus grow pointer z-5" role="button" aria-label="scrolltop button" tabIndex="-2" onClick={onScrollTop} onKeyDown={onKeyScroll}>
            <FontAwesomeIcon icon={faChevronUp} />
          </div>
          :
          null
      }
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
