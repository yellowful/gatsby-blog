import React from 'react'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

//用來顯示index page的最上面hero的畫面
const HeroIndex = ({imageData,slogan}) => {
    return (
        <section className="w-100">
                <BackgroundImage
                    Tag={"div"}
                    className="hero is-fullheight-with-navbar"
                    fluid={imageData}
                    backgroundColor={`#000`}
                >
                    <div className="w-100 h-100 absolute clip-path-hero flex flex-column justify-center">
                        <div className="columns ma2 ma3-ns">
                            <div className="column">
                                <h1 key="hero-slogan-1" className="f2-l f3-m f4 light-silver tc">
                                    {slogan[0]}
                                </h1>
                                <h1 key="hero-slogan-2" className="f2-l f3-m f4 light-silver tc">
                                    {slogan[1]}
                                </h1>
                            </div>
                            <footer className="column flex flex-column justify-end">
                                <Link
                                    to="/about/#bio"
                                    replace={false}
                                    className="ma2 f3-l f4-m f5  tr tr-m tc-l"
                                >
                                    關於我<FontAwesomeIcon icon={faAngleDoubleRight} />
                                </Link>
                            </footer>
                        </div>
                    </div>
                </BackgroundImage>
        </section>
    )
}










export default HeroIndex
