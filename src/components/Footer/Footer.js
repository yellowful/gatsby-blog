import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'
import BdrLogo from "../../images/svg/bdrlogo.svg"


const Footer = () => {

    return (
        <footer className="has-background-dark w-100 flex justify-center">
            <span className="pv2 bg-dark-gray w-100 w-90-m w-80-l mw8 tr">
                <span className="dib v-btm moon-gray f7 f6-ns">
                    © 2021, Built by &nbsp;
            </span>
                <Link to={`/terms-n-policy/copy-right/`} className="dib mr2 v-btm f7 f6-ns mr4-ns">
                    <BdrLogo className="dib v-mid w2 h1" fill="#3273dc" />
                    <span className="dib v-mid">
                        蟲探理查
                    </span>
                </Link>

                <Link to={`/terms-n-policy/privacy-policy/`} className="dib v-btm f7 f6-ns mr1 mr2-ns">
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
