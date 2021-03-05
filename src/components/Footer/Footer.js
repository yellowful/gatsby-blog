import React from 'react'
import { useStaticQuery, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'

//import Img from "gatsby-image"

const Footer = () => {
    const data = useStaticQuery(graphql`
    query polocyQuery {
        allContentfulPrivacyPolicy {
          edges {
            node {
              privacyPolicyContent {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    `)

    return (
        <footer className="has-background-dark w-100 flex justify-center">
            <span className="pv2 bg-dark-gray w-100 w-90-m w-80-l mw8 tr">
                <span className="dib v-btm moon-gray f7 f6-ns">
                    © 2021, Built by &nbsp;
            </span>
                <Link to="/terms-n-policy/copy-right/" className="dib mr2 v-btm f7 f6-ns mr4-ns">
                    <FontAwesomeIcon icon={faGithub} />
                    <span>
                        蟲探理查
                    </span>
                </Link>

                <Link to="/terms-n-policy/privacy-policy/" className="dib v-btm f7 f6-ns mr2 mr4-ns">
                    <FontAwesomeIcon icon={faUserLock} />
                    <span>
                        隱私權 &nbsp;
                    </span>
                </Link>
            </span>
        </footer>
    )
}

export default Footer
