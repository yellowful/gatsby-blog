import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

//用來顯示index page的最上面hero的畫面
const HeroIndex = ({ slogan }) => {
  return (
    <section className="w-100">
      <div className="hero is-fullheight-with-navbar hero-background-svg">
        <div className="w-100 h-100 absolute clip-path-hero flex flex-column justify-center">
          <div className="columns w-100">
            <div className="column">
              <h1 key="hero-slogan-1" className="f2-l f3-m f4 light-silver tc">
                {slogan[0]}
              </h1>
              <h1 key="hero-slogan-2" className="f2-l f3-m f4 light-silver tc">
                {slogan[1]}
              </h1>
            </div>
            <footer className="column tr tc-l">
              <div className="mt2 mt5-ns">
                <Link to="/about/#bio" replace={false} className="f3-l f4-m f5">
                  關於我
                  <FontAwesomeIcon className="ml1" icon={faAngleDoubleRight} />
                </Link>
              </div>
            </footer>
          </div>
        </div>
        </div>
    </section>
  )
}

export default HeroIndex

