/*
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import "@fontsource/noto-sans-tc"
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FacebookProvider } from "react-facebook"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import CookieConsent from "react-cookie-consent"
import "tachyons"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import "./mystyles.css"
import "./layout.css"
import { facebookAppId } from "../../utils/api"

//用來包住所有網頁，所以css可以在這個component裡面import
const Layout = ({ children }) => {
  //把偵測到scroll多遠了設成scrillPosition的state
  const [scrollPosition, setScrollPosition] = useState(0);
  // 設定CookieCosent要不要用scroll來接受cookie，當瀏覽器的語系是中文時，acceptScrolling才會是true
  const [acceptScrolling, setAcceptScrolling] = useState(false);
  // 設定有不要把CookieCosent給render出來，因為acceptScrolling只有CookieConsent被render時設定才有效，所以設定acceptScrolling和render需要在同一個life cycle。
  const [renderBar, setRenderBar] = useState(false);
  //window.pageYOffset是目前scroll多遠了，把他放進scrollPosition這個state當中
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }
  useEffect(() => {
    // window和browser有關，所以需放在useEffect裡面，才不會在SSR時出錯
    window.addEventListener("scroll", handleScroll, { passive: true })
    // navigator和browser有關，所以需放在useEffect裡面，才不會在SSR時出錯
    if (navigator) {
      // navigator.language是瀏覽器的語系，如果是中文，就把acceptScrolling設成true，只要scroll就會接受cookie
      // 如果不是中文，就需要click才能接受cookie
      // CookieConsent需要在這個life cycle才能render，setAcceptScrolling的設定才會生效，因為原始碼是把它設在componentDidMount裡面。
      if (navigator.language.includes('zh')) {
        setAcceptScrolling(true);
        setRenderBar(true);
      } else {
        setAcceptScrolling(false);
        setRenderBar(true);
      }
    }
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  const onScrollTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }
  //用來跳到最上面
  const onKeyScroll = event => {
    if (event.key === "ArrowUp")
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
  }
  //網站的名稱，用來傳給Header
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  //當scroll了1024個px之後，才顯示回到最頂的按鈕

  //讓cookies開啟
  const onAccept = (e) => {
    window["ga-disable-G-4T61R4H6E8"] = false
  }

  return (
    <div className="flex flex-column items-center">
      <FacebookProvider appId={facebookAppId}>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main className="w-100 flex flex-column">{children}</main>
        {
          renderBar && (
            <CookieConsent
              acceptOnScroll={acceptScrolling}
              acceptOnScrollPercentage={10}
              disableButtonStyles={true}
              buttonClasses="button-reset bg-lightest-blue navy mh3 mb3 mt3-ns pa1"
              location="bottom"
              buttonText="了解"
              cookieName="cookie-of-cookie-cosent"
              expires={150}
              onAccept={onAccept}
            >
              本站有使用cookies，如果您繼續瀏覽代表您同意本站的
              <Link to="/terms-n-policy/privacy-policy/">隱私權政策</Link>。
            </CookieConsent>
          )
        }
        <Footer />
      </FacebookProvider>
      {scrollPosition >= 1024 ? (
        <div
          className="tc light-blue o-80 f2 br3 fixed bottom-3 right-1 w3 h3 bw0 button-focus grow pointer z-5"
          role="button"
          aria-label="scrolltop button"
          tabIndex="-2"
          onClick={onScrollTop}
          onKeyDown={onKeyScroll}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      ) : null}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
